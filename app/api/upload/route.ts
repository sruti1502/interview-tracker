import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const applicationId = formData.get("applicationId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID missing" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension =
      file.name.split(".").pop();

    const fileName =
      `${uuid()}.${extension}`;

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );

    await writeFile(uploadPath, buffer);

    const document =
      await prisma.document.create({
        data: {
          fileName: file.name,
          fileUrl: `/uploads/${fileName}`,
          fileType: file.type,
          fileSize: file.size,
          applicationId,
        },
      });

    return NextResponse.json(document);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}