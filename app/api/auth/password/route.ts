import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

/**
 * POST /api/auth/password — change the signed-in customer's password.
 *
 * Requires the current password so a stolen session cookie alone cannot lock the real owner
 * out of their account. Other sessions are not invalidated, because tokens are stateless —
 * a future improvement would be a token version column on `users`.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionUser(request);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const currentPassword = String(body.currentPassword ?? "");
  const newPassword = String(body.newPassword ?? "");

  const errors: Record<string, string> = {};
  if (!currentPassword) errors.currentPassword = "Enter your current password";
  if (!newPassword) {
    errors.newPassword = "Enter a new password";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  } else if (newPassword === currentPassword) {
    errors.newPassword = "New password must be different from the current one";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields", errors },
      { status: 400 }
    );
  }

  const rows = (await query("SELECT password FROM users WHERE id = ?", [session.id])) as any[];
  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(currentPassword, rows[0].password);
  if (!isValid) {
    return NextResponse.json(
      {
        error: "Please fix the highlighted fields",
        errors: { currentPassword: "That is not your current password" },
      },
      { status: 401 }
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await query("UPDATE users SET password = ? WHERE id = ?", [hashed, session.id]);

  return NextResponse.json({ success: true });
}
