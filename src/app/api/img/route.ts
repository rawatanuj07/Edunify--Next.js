import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

// Set up multer to handle file uploads

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Use multer to process the file upload
    const data = await req.formData();
    console.log("req D is", data);
    const file = data.get("image") as File;
    console.log("req P is", file);

    // Check if req.file is defined
    if (!file) {
      console.error("No file uploaded with the request");
      return NextResponse.json(
        { error: "No file uploaded with the request" },
        { status: 400 }
      );
    }
    console.log("JUST1");
    const uploadDirectory = path.resolve("./public/uploads");
    console.log("JUST2");

    await fs.mkdir(uploadDirectory, { recursive: true });
    console.log("JUST3");
    ``;

    const destinationPath = path.join(uploadDirectory, file.name);
    console.log("JUST4");

    await fs.writeFile(destinationPath, Buffer.from(await file.arrayBuffer()));
    console.log("JUST5");

    const imageUrl = `/uploads/${file.name}`;
    console.log("JUST6");

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error handling file upload:", error);
    return NextResponse.json(
      { error: "Error handling file upload", details: (error as any).message },
      { status: 500 }
    );
  }
}
