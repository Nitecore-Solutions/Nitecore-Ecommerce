import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { generateToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const existingUsers = await query("SELECT id FROM users WHERE email = ?", [email]);
    console.log("Existing users:", JSON.stringify(existingUsers), "Length:", (existingUsers as any[]).length);
    const existing = existingUsers as any[];

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userRole = role || "user";

    const result = await query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole]
    );

    const insertResult = result as any;
    const userId = insertResult.insertId;
    const token = generateToken(userId, userRole);

    const response = NextResponse.json({
      message: "Account created successfully",
      user: { id: userId, name, email, role: userRole },
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Signup error:", error.message || error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
