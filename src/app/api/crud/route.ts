// pages/api/schools.ts
import { NextRequest, NextResponse } from "next/server";
import { createDatabasePool } from "@/../db";
import { OkPacket } from "mysql2";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("c1");
  const pool = await createDatabasePool();
  const data = await req.json();
  console.log("the data is ", data);
  const { id, name, address, city, state, contact, email, imageUrl } = data;
  console.log({ id, name, address, city, state, contact, email, imageUrl });
  try {
    const [result] = (await pool.execute(
      `INSERT INTO schools (id, name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [id, name, address, city, state, contact, imageUrl, email]
    )) as OkPacket[];

    return NextResponse.json({ id: result.insertId }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
