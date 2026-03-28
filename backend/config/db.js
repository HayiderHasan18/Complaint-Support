import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
}).promise();
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("database connected successfully!");
    conn.release();
  } catch (err) {
    console.error("database  connection failed:", err.message);
  }
})();

export default db;
