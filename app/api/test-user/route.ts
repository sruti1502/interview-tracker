import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    return Response.json({
      userModelExists:
        typeof prisma.user !== "undefined",
      applicationModelExists:
        typeof prisma.application !== "undefined",
    });
  } catch (error) {
    return Response.json({
      error: String(error),
    });
  }
}