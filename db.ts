// db.ts
import mysql from "mysql2/promise";

// Function to create and return a MySQL connection pool
export async function createDatabasePool() {
  const ipool = mysql.createPool({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    // database: "student", // Specify the database name here
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await ipool.execute("CREATE DATABASE IF NOT EXISTS edunify");
  // await pool.execute("USE edunify");
  await ipool.end();

  // Create a new connection specifying the new database
  const pool = mysql.createPool({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "edunify",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      contact BIGINT,
      image TEXT,
      email_id TEXT
    )
  `);

  return pool;
}
