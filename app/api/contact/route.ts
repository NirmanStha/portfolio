import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Inside your app/api/contact/route.ts -> POST function

    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    // 1. Check if fields exist
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // 2. Validate Email Format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 },
      );
    }

    // 3. Prevent Injection/Length abuse (Security Best Practice)
    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: "Content too long." }, { status: 400 });
    }

    // 2. SMTP Configuration from Environment Variables
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const secure = process.env.SMTP_SECURE === "true"; // true for 465, false for other ports
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS; // Use your App Password here

    if (!host || !user || !pass) {
      console.error("Internal Server Error: SMTP credentials missing in .env");
      return NextResponse.json(
        { error: "Email configuration error." },
        { status: 500 },
      );
    }

    // 3. Create Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // 4. Setup Email Details
    const to = process.env.CONTACT_TO || user;
    const subjectLine = subject?.trim()
      ? `${subject} — ${name}`
      : `Portfolio Contact: ${name}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a; }
    .header { border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 20px; }
    .header h1 { font-size: 24px; margin: 0; color: #000; font-style: italic; }
    .card { background-color: #f9f9f9; border-radius: 16px; padding: 24px; border: 1px solid #eeeeee; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; font-weight: bold; margin-bottom: 4px; }
    .value { font-size: 16px; margin-bottom: 20px; color: #333; }
    .message-box { background: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #000; margin-top: 10px; white-space: pre-wrap; }
    .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Project Inquiry</h1>
    </div>
    <div class="card">
      <div class="label">From</div>
      <div class="value"><strong>${name}</strong> (${email})</div>
      
      <div class="label">Subject</div>
      <div class="value">${subject || "No Subject Provided"}</div>
      
      <div class="label">Message</div>
      <div class="message-box">${message.replace(/\n/g, "<br/>")}</div>
    </div>
    <div class="footer">
      Sent from your Portfolio Website Portfolio
    </div>
  </div>
</body>
</html>
`;

    // 5. Send Mail
    await transporter.sendMail({
      from: `"${name}" <${user}>`, // Must be 'user' to avoid being flagged as spam/spoofing
      to,
      replyTo: email, // This allows you to hit "Reply" and email the sender directly
      subject: subjectLine,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err: any) {
    console.error("Nodemailer Error:", err.message);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
