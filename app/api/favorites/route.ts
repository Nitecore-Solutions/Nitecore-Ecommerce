import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { ensureClientSchema } from "@/lib/schema";

/**
 * GET /api/favorites — the signed-in customer's wishlist, joined with live product data so
 * prices and images stay current even if a product changed after it was favourited.
 * Products that have since been deleted are dropped.
 */
export async function GET(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await ensureClientSchema();

  const rows = (await query(
    `SELECT f.id AS favorite_id, f.created_at AS favorited_at, p.*
     FROM favorites f
     JOIN products p ON p.id = f.product_id
     WHERE f.user_id = ?
     ORDER BY f.created_at DESC`,
    [session.id]
  )) as any[];

  return NextResponse.json({
    favorites: rows.map((row) => ({
      ...row,
      price: Number(row.price) || 0,
    })),
  });
}

/**
 * POST /api/favorites — add or remove a product from the wishlist.
 *
 * Idempotent toggle: the request body may set `favorited` explicitly, otherwise the current
 * state is flipped. Responds with the resulting state so the caller can update the UI
 * without a second round trip.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { productId?: number; favorited?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const productId = Number(body.productId);
  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json({ error: "A valid productId is required" }, { status: 400 });
  }

  await ensureClientSchema();

  const products = (await query("SELECT id FROM products WHERE id = ? LIMIT 1", [
    productId,
  ])) as any[];
  if (products.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const existing = (await query(
    "SELECT id FROM favorites WHERE user_id = ? AND product_id = ? LIMIT 1",
    [session.id, productId]
  )) as any[];

  const shouldAdd =
    typeof body.favorited === "boolean" ? body.favorited : existing.length === 0;

  if (shouldAdd) {
    if (existing.length === 0) {
      await query("INSERT INTO favorites (user_id, product_id) VALUES (?, ?)", [
        session.id,
        productId,
      ]);
    }
  } else if (existing.length > 0) {
    await query("DELETE FROM favorites WHERE user_id = ? AND product_id = ?", [
      session.id,
      productId,
    ]);
  }

  return NextResponse.json({ success: true, productId, favorited: shouldAdd });
}

/** DELETE /api/favorites?productId=123 — remove without toggling. */
export async function DELETE(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const productId = Number(new URL(request.url).searchParams.get("productId"));
  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json({ error: "A valid productId is required" }, { status: 400 });
  }

  await ensureClientSchema();
  await query("DELETE FROM favorites WHERE user_id = ? AND product_id = ?", [
    session.id,
    productId,
  ]);

  return NextResponse.json({ success: true, productId, favorited: false });
}
