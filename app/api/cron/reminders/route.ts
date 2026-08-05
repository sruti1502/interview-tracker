import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/mail";

export async function GET(request: NextRequest) {

  const authHeader = request.headers.get("authorization");

  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {

    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow);

    start.setHours(0, 0, 0, 0);

    const end = new Date(tomorrow);

    end.setHours(23, 59, 59, 999);

    const interviews =
      await prisma.application.findMany({

        where: {
          interviewDate: {
            gte: start,
            lte: end,
          },
        },

        include: {
          user: true,
        },

      });

    let sent = 0;

    for (const interview of interviews) {

      if (!interview.user.email) continue;

      await sendReminderEmail(
        interview.user.email,
        interview.company,
        interview.role,
        interview.interviewDate!
      );

      sent++;

    }

    return NextResponse.json({
      success: true,
      remindersSent: sent,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );

  }
}