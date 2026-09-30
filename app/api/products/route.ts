import { NextResponse, NextRequest } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

let tableEnsured = false;

async function ensureTable() {
  if (tableEnsured) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        slug VARCHAR(300) NOT NULL,
        category VARCHAR(100) NOT NULL,
        brand VARCHAR(100) DEFAULT '',
        price DECIMAL(12,2) DEFAULT 0,
        image_url TEXT,
        images JSON,
        description_intro TEXT,
        specifications JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const columns = [
      { name: "slug", def: "VARCHAR(300) NOT NULL" },
      { name: "brand", def: "VARCHAR(100) DEFAULT ''" },
      { name: "images", def: "JSON" },
      { name: "description_intro", def: "TEXT" },
      { name: "specifications", def: "JSON" },
      { name: "price", def: "DECIMAL(12,2) DEFAULT 0" },
      { name: "category", def: "VARCHAR(100) NOT NULL DEFAULT 'General'" },
      { name: "image_url", def: "TEXT" },
    ];

    for (const col of columns) {
      try {
        await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.def}`);
      } catch {
        // Handled: column already exists
      }
    }
    tableEnsured = true;
  } catch (err) {
    console.error("ensureTable error:", err);
  }
}

export async function GET(request: NextRequest) {
  await ensureTable();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  
  let sql = "SELECT * FROM products WHERE 1=1";
  const params: any[] = [];
  
  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }
  if (brand) {
    sql += " AND brand = ?";
    params.push(brand);
  }
  
  sql += " ORDER BY created_at DESC";
  
  const rows = params.length > 0 ? await query(sql, params) : await query(sql);
  return NextResponse.json({ products: rows });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureTable();
  const { name, slug, category, brand, price, image_url, images, description_intro, specifications } = await request.json();
  if (!name || !slug) return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });

  await query(
    "INSERT INTO products (name, slug, category, brand, price, image_url, images, description_intro, specifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [name, slug, category, brand || "", price || 0, image_url, JSON.stringify(images || []), description_intro || "", JSON.stringify(specifications || {})]
  );
  return NextResponse.json({ success: true });
}
