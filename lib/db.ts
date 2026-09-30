import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "ecommerce",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(pool as any).on("error", (err: any) => {
  console.error("MySQL pool error:", err);
});

export async function query(sql: string, params?: any[]) {
  try {
    if (params) {
      const result = await pool.execute(sql, params);
      console.log("Query result type:", typeof result, "Is array:", Array.isArray(result), "Length:", (result as any).length);
      const [rows] = result as [any[], any[]];
      console.log("Rows:", JSON.stringify(rows).substring(0, 200));
      return rows;
    }
    const result = await pool.query(sql);
    console.log("Query result type:", typeof result, "Is array:", Array.isArray(result));
    const [rows] = result as [any[], any[]];
    return rows;
  } catch (error: any) {
    console.error("Query error:", error.message || error);
    throw error;
  }
}

export async function getConnection() {
  return pool.getConnection();
}

export default pool;
