import crypto from "crypto";
import { client } from "@/src/sanity/lib/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    // Check user exists in Sanity
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email },
    );

    // Always return success to prevent email enumeration
    if (!user) {
      return Response.json({
        message: "If that email exists, a link was sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1hr

    // Delete any existing token for this email first
    const existing = await client.fetch(
      `*[_type == "passwordResetToken" && email == $email]{ _id }`,
      { email },
    );

    for (const doc of existing) {
      await client.delete(doc._id);
    }

    // Save new token to Sanity
    await client.create({ _type: "passwordResetToken", email, token, expires });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const { error } = await resend.emails.send({
      from: process.env.APPOINTMENT_EMAIL_FROM!,
      to: process.env.APPOINTMENT_EMAIL_TO!,
      // to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Reset your password</h2>
          <p>We received a request to reset your password. Click the button below to choose a new one.</p>
          <a href="${resetUrl}"
            style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px;
                   border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #6b7280; font-size: 14px;">
            This link expires in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color: #6b7280; font-size: 12px;">
            Or copy this link: <a href="${resetUrl}">${resetUrl}</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email." }, { status: 500 });
    }

    return Response.json({ message: "If that email exists, a link was sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
