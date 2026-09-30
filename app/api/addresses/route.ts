import { NextResponse, NextRequest } from "next/server";
import { query, getConnection } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { ensureClientSchema } from "@/lib/schema";
import { validateAddress, type AddressInput } from "@/lib/validation";

/** GET /api/addresses — the signed-in customer's saved addresses, default first. */
export async function GET(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await ensureClientSchema();

  const addresses = (await query(
    "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC",
    [session.id]
  )) as any[];

  return NextResponse.json({ addresses });
}

/**
 * POST /api/addresses — save a new address.
 *
 * The first address a customer saves is always promoted to default, otherwise checkout would
 * have nothing to preselect.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: Partial<AddressInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const errors = validateAddress(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields", errors }, { status: 400 });
  }

  await ensureClientSchema();

  const existing = (await query("SELECT COUNT(*) AS total FROM addresses WHERE user_id = ?", [
    session.id,
  ])) as any[];
  const isFirst = Number(existing[0]?.total || 0) === 0;
  const makeDefault = isFirst || body.isDefault === true;

  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    if (makeDefault) {
      await conn.execute("UPDATE addresses SET is_default = 0 WHERE user_id = ?", [session.id]);
    }
    const [result] = (await conn.execute(
      `INSERT INTO addresses
        (user_id, label, full_name, phone, line1, line2, city, state, pincode, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.id,
        String(body.label ?? "Home").trim().slice(0, 60) || "Home",
        String(body.fullName).trim(),
        String(body.phone).trim(),
        String(body.line1).trim(),
        String(body.line2 ?? "").trim(),
        String(body.city).trim(),
        String(body.state).trim(),
        String(body.pincode).trim(),
        makeDefault ? 1 : 0,
      ]
    )) as any;
    await conn.commit();

    const rows = (await query("SELECT * FROM addresses WHERE id = ?", [(result as any).insertId])) as any[];
    return NextResponse.json({ success: true, address: rows[0] }, { status: 201 });
  } catch (error) {
    await conn.rollback();
    console.error("POST /api/addresses error:", error);
    return NextResponse.json({ error: "Could not save address" }, { status: 500 });
  } finally {
    conn.release();
  }
}
