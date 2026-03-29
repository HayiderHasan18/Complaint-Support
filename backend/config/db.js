import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SSL certificate
let sslConfig = {};
try {
  const caCertPath = path.join(__dirname, 'ca.pem');
  if (fs.existsSync(caCertPath)) {
    sslConfig = {
      ssl: {
        ca: fs.readFileSync(caCertPath),
        rejectUnauthorized: true
      }
    };
    console.log("✅ SSL certificate loaded");
  } else {
    console.warn("⚠️  CA certificate not found at:", caCertPath);
    // For Aiven, we still need SSL even without cert
    sslConfig = {
      ssl: {
        rejectUnauthorized: false
      }
    };
  }
} catch (error) {
  console.error("❌ Error loading SSL certificate:", error.message);
  sslConfig = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

// Create connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ...sslConfig
}).promise();

// Test connection immediately
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connected successfully!");
    console.log(`📊 Connected to: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Test a simple query
    const [result] = await connection.query("SELECT VERSION() as version");
    console.log(`🔧 MySQL Version: ${result[0].version}`);
    
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    console.error("Connection details:");
    console.error(`  Host: ${process.env.DB_HOST}`);
    console.error(`  Port: ${process.env.DB_PORT}`);
    console.error(`  User: ${process.env.DB_USER}`);
    console.error(`  Database: ${process.env.DB_NAME}`);
    console.error(`  SSL Enabled: ${!!sslConfig.ssl}`);
  }
})();

export default db;