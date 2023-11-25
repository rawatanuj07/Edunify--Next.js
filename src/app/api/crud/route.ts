// pages/api/schools.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createDatabasePool } from "@/db";
const pool = await createDatabasePool();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, image, email_id } = req.body;

    try {
      const [result] = await pool.execute(
        `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, image, email_id]
      );

      res.status(200).json({ id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
