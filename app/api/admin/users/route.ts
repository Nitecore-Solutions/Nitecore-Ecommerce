import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function requireAdmin(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded?.role === "admin";
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // Ensure status column exists
  const cols = await query("SHOW COLUMNS FROM users LIKE 'status'") as any[];
  if (cols.length === 0) {
    await query("ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active'");
  }
  const users = await query("SELECT id, name, email, role, status, created_at FROM users ORDER BY id DESC");
  return NextResponse.json({ users });
}
