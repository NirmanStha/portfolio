import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT, 10)
      : 587;
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.error("SMTP not configured", { host, user });
      return NextResponse.json(
        { error: "SMTP server not configured" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const to = process.env.CONTACT_TO || user;
    const from = process.env.CONTACT_FROM || user;

    const subjectLine =
      subject && subject.trim() !== ""
        ? `${subject} — ${name}`
        : `New message from ${name}`;

    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${(message || "").replace(/\n/g, "<br/>")}</p>`;

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to,
      subject: subjectLine,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending contact email", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
