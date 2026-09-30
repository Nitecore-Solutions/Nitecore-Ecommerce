import { NextResponse, NextRequest } from "next/server";
import { query, getConnection } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { ensureClientSchema } from "@/lib/schema";

/** Flat-rate shipping; waived above the threshold. */
const SHIPPING_FLAT = 499;
const FREE_SHIPPING_ABOVE = 25000;

/** Human-friendly, collision-resistant order reference. */
function generateOrderNo(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.floor(Math.random() * 46656)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `NC-${stamp}${rand}`;
}

type IncomingItem = { productId?: number; slug?: string; quantity?: number };

/**
 * GET /api/orders — the signed-in customer's orders, newest first, with their line items
 * and an aggregated item count.
 */
export async function GET(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await ensureClientSchema();

  const orders = (await query(
    "SELECT * FROM customer_orders WHERE user_id = ? ORDER BY created_at DESC, id DESC",
    [session.id]
  )) as any[];

  if (orders.length === 0) {
    return NextResponse.json({ orders: [] });
  }

  const items = (await query(
    `SELECT oi.* FROM customer_order_items oi
     JOIN customer_orders o ON o.id = oi.order_id
     WHERE o.user_id = ?
     ORDER BY oi.id ASC`,
    [session.id]
  )) as any[];

  const withItems = orders.map((order) => ({
    ...order,
    subtotal: Number(order.subtotal),
    shipping: Number(order.shipping),
    total: Number(order.total),
    items: items
      .filter((item) => item.order_id === order.id)
      .map((item) => ({
        ...item,
        unit_price: Number(item.unit_price),
        line_total: Number(item.line_total),
      })),
  }));

  return NextResponse.json({ orders: withItems });
}

/**
 * POST /api/orders — place an order from the cart.
 *
 * Prices and product names are resolved from the database, never taken from the request
 * body, so a tampered client cannot set its own totals. Runs in a transaction so a failure
 * part-way through cannot leave an order without its items.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { items?: IncomingItem[]; address?: Record<string, string>; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const incoming = Array.isArray(body.items) ? body.items : [];
  if (incoming.length === 0) {
    return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
  }
  if (incoming.length > 50) {
    return NextResponse.json({ error: "Too many items in one order" }, { status: 400 });
  }

  // Collapse duplicate lines and clamp quantities before hitting the database.
  const wanted = new Map<string, { productId?: number; slug?: string; quantity: number }>();
  for (const raw of incoming) {
    const productId = Number(raw.productId);
    const slug = typeof raw.slug === "string" ? raw.slug.trim() : "";
    if (!Number.isFinite(productId) && !slug) continue;

    const quantity = Math.min(
      99,
      Math.max(1, Math.floor(Number(raw.quantity) || 1))
    );
    const key = Number.isFinite(productId) ? `id:${productId}` : `slug:${slug}`;
    const existing = wanted.get(key);
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + quantity);
    } else {
      wanted.set(key, {
        ...(Number.isFinite(productId) ? { productId } : {}),
        ...(slug ? { slug } : {}),
        quantity,
      });
    }
  }

  if (wanted.size === 0) {
    return NextResponse.json({ error: "No valid items in cart" }, { status: 400 });
  }

  await ensureClientSchema();

  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    const lines: Array<{
      product_id: number;
      product_name: string;
      product_slug: string;
      product_image: string | null;
      unit_price: number;
      quantity: number;
      line_total: number;
    }> = [];

    for (const item of wanted.values()) {
      const [rows] = (await conn.execute(
        "SELECT id, name, slug, price, image_url FROM products WHERE id = ? LIMIT 1",
        [item.productId ?? 0]
      )) as [any[], any];

      let product = rows[0] as any;

      if (!product && item.slug) {
        const [slugRows] = (await conn.execute(
          "SELECT id, name, slug, price, image_url FROM products WHERE slug = ? LIMIT 1",
          [item.slug]
        )) as [any[], any];
        product = slugRows[0];
      }

      if (!product) {
        // Roll the whole thing back rather than silently dropping a line.
        await conn.rollback();
        return NextResponse.json(
          { error: "One or more items are no longer available" },
          { status: 409 }
        );
      }

      const unitPrice = Number(product.price) || 0;
      lines.push({
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
        product_image: product.image_url || null,
        unit_price: unitPrice,
        quantity: item.quantity,
        line_total: unitPrice * item.quantity,
      });
    }

    const subtotal = lines.reduce((sum, l) => sum + l.line_total, 0);
    const shipping = subtotal >= FREE_SHIPPING_ABOVE || subtotal === 0 ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;

    const addr = body.address || {};
    const orderNo = generateOrderNo();

    const [orderResult] = (await conn.execute(
      `INSERT INTO customer_orders
        (order_no, user_id, status, subtotal, shipping, total, payment_method,
         contact_name, contact_phone, address_line, city, state, pincode, notes)
       VALUES (?, ?, 'pending', ?, ?, ?, 'whatsapp', ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNo,
        session.id,
        subtotal,
        shipping,
        total,
        addr.fullName || "",
        addr.phone || "",
        [addr.line1, addr.line2].filter(Boolean).join(", "),
        addr.city || "",
        addr.state || "",
        addr.pincode || "",
        body.notes || "",
      ]
    )) as any;

    const orderId = (orderResult as any).insertId;

    for (const line of lines) {
      await conn.execute(
        `INSERT INTO customer_order_items
          (order_id, product_id, product_name, product_slug, product_image,
           unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          line.product_id,
          line.product_name,
          line.product_slug,
          line.product_image,
          line.unit_price,
          line.quantity,
          line.line_total,
        ]
      );
    }

    await conn.commit();

    return NextResponse.json(
      {
        success: true,
        order: {
          id: orderId,
          order_no: orderNo,
          subtotal,
          shipping,
          total,
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    await conn.rollback();
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Could not place order" }, { status: 500 });
  } finally {
    conn.release();
  }
}
