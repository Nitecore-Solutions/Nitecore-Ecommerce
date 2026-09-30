import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const results = await query("SELECT id, name, email, role FROM users WHERE id = ?", [decoded.userId]);
  const users = results as any[];

  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = users[0];
  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}

/**
 * PATCH /api/auth/me — update the signed-in customer's own details.
 *
 * The `users` table has no `phone` column of its own, so a phone number is stored on the
 * address book instead; this route only writes `name` and `email`. Email is re-validated
 * for uniqueness because it is the login identifier.
 *
 * The JWT embeds only `userId`, so changing these details does not require a re-login.
 */
export async function PATCH(request: NextRequest) {
  const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  const decoded = token ? verifyToken(token) : null;
  if (!decoded) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const updates: string[] = [];
  const params: any[] = [];

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (body.name !== undefined) {
    if (name.length < 2) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields", errors: { name: "Name must be at least 2 characters" } },
        { status: 400 }
      );
    }
    updates.push("name = ?");
    params.push(name);
  }

  if (body.email !== undefined) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields", errors: { email: "Enter a valid email address" } },
        { status: 400 }
      );
    }
    const taken = (await query("SELECT id FROM users WHERE email = ? AND id <> ?", [
      email,
      decoded.userId,
    ])) as any[];
    if (taken.length > 0) {
      return NextResponse.json(
        { error: "Please fix the highlighted fields", errors: { email: "That email is already registered" } },
        { status: 409 }
      );
    }
    updates.push("email = ?");
    params.push(email);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  params.push(decoded.userId);
  await query(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, params);

  const rows = (await query("SELECT id, name, email, role FROM users WHERE id = ?", [
    decoded.userId,
  ])) as any[];

  return NextResponse.json({ success: true, user: rows[0] });
}
