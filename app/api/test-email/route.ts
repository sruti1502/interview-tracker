import { NextResponse } from "next/server";
import { sendReminderEmail } from "@/lib/mail";

export async function GET() {
  try {
    await sendReminderEmail(
      process.env.EMAIL_USER!,
      "Google",
      "Software Engineer",
      new Date()
    );

    return NextResponse.json({
      message: "Email Sent Successfully",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}