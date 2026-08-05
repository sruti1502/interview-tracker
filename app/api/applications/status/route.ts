import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request
) {
  const body =
    await request.json();

  const application =
    await prisma.application.update({
      where: {
        id: body.id,
      },
      data: {
        status: body.status,
      },
    });

  return Response.json(
    application
  );
}