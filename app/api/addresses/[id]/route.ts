import { NextResponse, NextRequest } from "next/server";
import { query, getConnection } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { ensureClientSchema } from "@/lib/schema";
import { validateAddress, type AddressInput } from "@/lib/validation";

/** PATCH /api/addresses/[id] — update or set as default. */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  let body: Partial<AddressInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  await ensureClientSchema();

  const existing = (await query("SELECT * FROM addresses WHERE id = ? AND user_id = ?", [
    id,
    session.id,
  ])) as any[];
  if (existing.length === 0) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  // Merge onto the stored row so a partial update (e.g. just flipping the default flag)
  // still validates against the complete address.
  const merged = {
    label: body.label ?? existing[0].label,
    fullName: body.fullName ?? existing[0].full_name,
    phone: body.phone ?? existing[0].phone,
    line1: body.line1 ?? existing[0].line1,
    line2: body.line2 ?? existing[0].line2,
    city: body.city ?? existing[0].city,
    state: body.state ?? existing[0].state,
    pincode: body.pincode ?? existing[0].pincode,
    isDefault: body.isDefault,
  };

  // `?only=default` is a lightweight "make this my default" action from the address list.
  const onlyDefault = new URL(request.url).searchParams.get("only") === "default";
  if (!onlyDefault) {
    const errors = validateAddress(merged);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields", errors },
        { status: 400 }
      );
    }
  }

  const makeDefault =
    onlyDefault || body.isDefault === true
      ? true
      : body.isDefault === false
        ? false
        : Boolean(existing[0].is_default);

  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    if (makeDefault) {
      await conn.execute("UPDATE addresses SET is_default = 0 WHERE user_id = ?", [session.id]);
    }
    await conn.execute(
      `UPDATE addresses
       SET label = ?, full_name = ?, phone = ?, line1 = ?, line2 = ?,
           city = ?, state = ?, pincode = ?, is_default = ?
       WHERE id = ? AND user_id = ?`,
      [
        String(merged.label ?? "Home").trim().slice(0, 60) || "Home",
        String(merged.fullName).trim(),
        String(merged.phone).trim(),
        String(merged.line1).trim(),
        String(merged.line2 ?? "").trim(),
        String(merged.city).trim(),
        String(merged.state).trim(),
        String(merged.pincode).trim(),
        makeDefault ? 1 : 0,
        id,
        session.id,
      ]
    );
    await conn.commit();

    const rows = (await query("SELECT * FROM addresses WHERE id = ?", [id])) as any[];
    return NextResponse.json({ success: true, address: rows[0] });
  } catch (error) {
    await conn.rollback();
    console.error("PATCH /api/addresses/[id] error:", error);
    return NextResponse.json({ error: "Could not update address" }, { status: 500 });
  } finally {
    conn.release();
  }
}

/** DELETE /api/addresses/[id] */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  await ensureClientSchema();

  const result = (await query("DELETE FROM addresses WHERE id = ? AND user_id = ?", [
    id,
    session.id,
  ])) as any;

  if ((result as any)?.affectedRows === 0) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  // Never leave a customer with zero defaults — promote the most recent remaining address.
  const remaining = (await query(
    "SELECT COUNT(*) AS total, SUM(is_default) AS defaults FROM addresses WHERE user_id = ?",
    [session.id]
  )) as any[];

  if (Number(remaining[0]?.defaults || 0) === 0 && Number(remaining[0]?.total || 0) > 0) {
    await query(
      "UPDATE addresses SET is_default = 1 WHERE user_id = ? ORDER BY id DESC LIMIT 1",
      [session.id]
    );
  }

  return NextResponse.json({ success: true });
}
