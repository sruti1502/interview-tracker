import { prisma } from "@/lib/prisma";

export async function GET() {
  const totalApplications =
    await prisma.application.count();

  const interviews =
    await prisma.application.count({
      where: {
        status: "INTERVIEW",
      },
    });

  const offers =
    await prisma.application.count({
      where: {
        status: "OFFER",
      },
    });

  const rejected =
    await prisma.application.count({
      where: {
        status: "REJECTED",
      },
    });

  return Response.json({
    totalApplications,
    interviews,
    offers,
    rejected,
  });
}