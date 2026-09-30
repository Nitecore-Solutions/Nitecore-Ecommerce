import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function requireAdmin(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded?.role === "admin";
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const { role, status } = await request.json();
  if (role) await query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
  if (status) await query("UPDATE users SET status = ? WHERE id = ?", [status, id]);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await query("DELETE FROM users WHERE id = ?", [id]);
  return NextResponse.json({ success: true });
}
