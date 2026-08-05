import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });

  if (!document) {
    return NextResponse.json(
      {
        error: "Document not found",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      document.fileUrl
    );

    await fs.unlink(filePath);
  } catch (error) {
    console.log("Physical file already deleted.");
  }

  await prisma.document.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}