import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json([], { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const company = searchParams.get("company") || "";
  const status = searchParams.get("status") || "";
  const location = searchParams.get("location") || "";

  const applications = await prisma.application.findMany({
    where: {
      userId: currentUser.id,

      company: {
        contains: company,
        mode: "insensitive",
      },

      location: {
        contains: location,
        mode: "insensitive",
      },

      ...(status ? { status } : {}),
    },

    orderBy: {
      appliedDate: "desc",
    },
  });

  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const application =
      await prisma.application.create({
        data: {
          company: body.company,
          role: body.role,
          status: body.status,

          appliedDate: body.appliedDate
            ? new Date(body.appliedDate)
            : new Date(),

          notes: body.notes || "",

          location: body.location || "",
          salary: body.salary || "",
          jobUrl: body.jobUrl || "",
          recruiterName:
            body.recruiterName || "",
          recruiterEmail:
            body.recruiterEmail || "",

          interviewDate:
            body.interviewDate
              ? new Date(body.interviewDate)
              : null,

          userId: currentUser.id,
        },
      });

    return NextResponse.json(application);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }


}