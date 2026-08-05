import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      content,
      applicationId,
    } = body;

    const note = await prisma.interviewNote.create({
      data: {
        title,
        content,
        applicationId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create interview note" },
      { status: 500 }
    );
  }
}