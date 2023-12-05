import { NextRequest, NextResponse } from "next/server";
import { createDatabasePool } from "@/../db";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const pool = await createDatabasePool();
    const rows = await pool.execute("SELECT * FROM schools");
    console.log("the rowss are", rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
