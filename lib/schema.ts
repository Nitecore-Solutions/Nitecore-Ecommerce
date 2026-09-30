/**
 * Schema bootstrap for the customer-facing tables (orders, wishlist, addresses).
 *
 * Mirrors the `ensureTable()` pattern already used by `app/api/products/route.ts`: create
 * if missing, then add any columns an older install is missing. This keeps the app working
 * against a database that was never migrated by hand.
 *
 * NOTE ON TABLE NAMES: the `orders` table in `database.sql` is a legacy single-item-per-row
 * shape (`product_id`, `quantity`, `total_price` all NOT NULL) that nothing reads or writes.
 * Customer orders are multi-item, so they live in `customer_orders` / `customer_order_items`
 * to avoid colliding with it. Do not rename these to `orders` unless the legacy table is
 * dropped first.
 */

import { query } from "./db";

let ensured = false;

const TABLES: Array<{ name: string; ddl: string }> = [
  {
    name: "customer_orders",
    ddl: `
      CREATE TABLE IF NOT EXISTS customer_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_no VARCHAR(32) NOT NULL UNIQUE,
        user_id INT NOT NULL,
        status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
        subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
        shipping DECIMAL(12,2) NOT NULL DEFAULT 0,
        total DECIMAL(12,2) NOT NULL DEFAULT 0,
        payment_method VARCHAR(40) DEFAULT 'whatsapp',
        contact_name VARCHAR(255) DEFAULT '',
        contact_phone VARCHAR(32) DEFAULT '',
        address_line VARCHAR(500) DEFAULT '',
        city VARCHAR(120) DEFAULT '',
        state VARCHAR(120) DEFAULT '',
        pincode VARCHAR(20) DEFAULT '',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user (user_id),
        INDEX idx_status (status)
      )
    `,
  },
  {
    name: "customer_order_items",
    ddl: `
      CREATE TABLE IF NOT EXISTS customer_order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT,
        product_name VARCHAR(500) NOT NULL,
        product_slug VARCHAR(300) DEFAULT '',
        product_image TEXT,
        unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
        quantity INT NOT NULL DEFAULT 1,
        line_total DECIMAL(12,2) NOT NULL DEFAULT 0,
        INDEX idx_order (order_id)
      )
    `,
  },
  {
    name: "favorites",
    ddl: `
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_fav (user_id, product_id),
        INDEX idx_fav_user (user_id)
      )
    `,
  },
  {
    name: "addresses",
    ddl: `
      CREATE TABLE IF NOT EXISTS addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        label VARCHAR(60) DEFAULT 'Home',
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(32) NOT NULL,
        line1 VARCHAR(500) NOT NULL,
        line2 VARCHAR(500) DEFAULT '',
        city VARCHAR(120) NOT NULL,
        state VARCHAR(120) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        is_default TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_addr_user (user_id)
      )
    `,
  },
];

/** Columns that may be missing on databases created by an earlier version of this file. */
const BACKFILL: Array<{ table: string; column: string; def: string }> = [
  { table: "customer_orders", column: "order_no", def: "VARCHAR(32) NOT NULL DEFAULT ''" },
  { table: "customer_orders", column: "notes", def: "TEXT" },
  { table: "customer_orders", column: "shipping", def: "DECIMAL(12,2) NOT NULL DEFAULT 0" },
  { table: "customer_orders", column: "payment_method", def: "VARCHAR(40) DEFAULT 'whatsapp'" },
  { table: "customer_order_items", column: "product_image", def: "TEXT" },
  { table: "addresses", column: "is_default", def: "TINYINT(1) NOT NULL DEFAULT 0" },
  { table: "addresses", column: "line2", def: "VARCHAR(500) DEFAULT ''" },
];

export async function ensureClientSchema(): Promise<void> {
  if (ensured) return;
  try {
    for (const table of TABLES) {
      await query(table.ddl);
    }
    for (const col of BACKFILL) {
      try {
        await query(`ALTER TABLE ${col.table} ADD COLUMN ${col.column} ${col.def}`);
      } catch {
        // Column already exists.
      }
    }
    ensured = true;
  } catch (error) {
    console.error("ensureClientSchema error:", error);
  }
}
