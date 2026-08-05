import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import * as XLSX from "xlsx";

export async function GET() {
  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return new Response(
      "Unauthorized",
      { status: 401 }
    );
  }

  const applications =
    await prisma.application.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const rows = applications.map(
    (app : any) => ({
      Company: app.company,
      Role: app.role,
      Status: app.status,
      Location: app.location,
      Salary: app.salary,
      Recruiter:
        app.recruiterName,
      RecruiterEmail:
        app.recruiterEmail,
      AppliedDate:
        app.appliedDate,
      Notes: app.notes,
    })
  );

  const workbook =
    XLSX.utils.book_new();

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Applications"
  );

  const buffer =
    XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      "Content-Disposition":
        'attachment; filename="applications.xlsx"',
    },
  });
}