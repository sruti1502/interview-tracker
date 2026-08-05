import { prisma } from "@/lib/prisma";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteProps
) {
  const { id } = await params;

  const body = await request.json();

  const application =
    await prisma.application.update({
      where: {
        id,
      },
      data: {
        company: body.company,
        role: body.role,
        status: body.status,

        location: body.location,
        salary: body.salary,
        jobUrl: body.jobUrl,

        recruiterName:
          body.recruiterName,

        recruiterEmail:
          body.recruiterEmail,

        interviewDate:
          body.interviewDate
            ? new Date(
                body.interviewDate
              )
            : null,

        notes: body.notes,
      },
    });

  return Response.json(application);
}

export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  const { id } = await params;

  await prisma.application.delete({
    where: {
      id,
    },
  });

  return Response.json({
    success: true,
  });
}