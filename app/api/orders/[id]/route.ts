import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { ensureClientSchema } from "@/lib/schema";

/** Statuses a customer is allowed to move an order to themselves. */
const CUSTOMER_CANCELLABLE = new Set(["pending", "processing"]);

/** GET /api/orders/[id] — a single order, scoped to its owner. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  await ensureClientSchema();

  const orders = (await query(
    "SELECT * FROM customer_orders WHERE id = ? AND user_id = ? LIMIT 1",
    [id, session.id]
  )) as any[];

  if (orders.length === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const items = (await query(
    "SELECT * FROM customer_order_items WHERE order_id = ? ORDER BY id ASC",
    [id]
  )) as any[];

  return NextResponse.json({
    order: {
      ...orders[0],
      subtotal: Number(orders[0].subtotal),
      shipping: Number(orders[0].shipping),
      total: Number(orders[0].total),
      items: items.map((item) => ({
        ...item,
        unit_price: Number(item.unit_price),
        line_total: Number(item.line_total),
      })),
    },
  });
}

/**
 * PATCH /api/orders/[id] — cancel an order.
 *
 * A customer may only cancel while the order is still pending or processing; once it has
 * shipped the request is refused so the customer contacts support instead.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  let body: { action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.action !== "cancel") {
    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }

  await ensureClientSchema();

  const orders = (await query(
    "SELECT id, status FROM customer_orders WHERE id = ? AND user_id = ? LIMIT 1",
    [id, session.id]
  )) as any[];

  if (orders.length === 0) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (!CUSTOMER_CANCELLABLE.has(orders[0].status)) {
    return NextResponse.json(
      { error: `An order that is already ${orders[0].status} cannot be cancelled online.` },
      { status: 409 }
    );
  }

  await query("UPDATE customer_orders SET status = 'cancelled' WHERE id = ? AND user_id = ?", [
    id,
    session.id,
  ]);

  return NextResponse.json({ success: true, status: "cancelled" });
}
