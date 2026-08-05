import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendReminderEmail(
  email: string,
  company: string,
  role: string,
  date: Date
) {
  await transporter.sendMail({
    from: `"Interview Tracker" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: `Interview Reminder - ${company}`,

    html: `
      <div style="font-family:Arial;padding:20px;">
        
        <h2>Interview Reminder</h2>

        <p>Hello,</p>

        <p>
          This is a reminder that you have an interview scheduled.
        </p>

        <table cellpadding="8">
          <tr>
            <td><b>Company</b></td>
            <td>${company}</td>
          </tr>

          <tr>
            <td><b>Role</b></td>
            <td>${role}</td>
          </tr>

          <tr>
            <td><b>Date</b></td>
            <td>${date.toDateString()}</td>
          </tr>

        </table>

        <br/>

        <p>
          Best of luck!
        </p>

        <p>
          Interview Tracker
        </p>

      </div>
    `,
  });
}