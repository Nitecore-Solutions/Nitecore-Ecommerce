import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rows = await query("SELECT * FROM products WHERE slug = ?", [slug]) as any[];
  if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const product = rows[0];
  product.images = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
  product.specifications = typeof product.specifications === "string" ? JSON.parse(product.specifications) : product.specifications;
  return NextResponse.json({ product });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = request.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { slug } = await params;
  await query("DELETE FROM products WHERE slug = ?", [slug]);
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = request.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { slug: oldSlug } = await params;
  const { name, slug, category, brand, price, image_url, images, description_intro, specifications } = await request.json();
  if (!name || !slug) return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });

  await query(
    `UPDATE products SET name = ?, slug = ?, category = ?, brand = ?, price = ?, image_url = ?, images = ?, description_intro = ?, specifications = ? WHERE slug = ?`,
    [name, slug, category, brand || "", price || 0, image_url, JSON.stringify(images || []), description_intro || "", JSON.stringify(specifications || {}), oldSlug]
  );
  return NextResponse.json({ success: true });
}

