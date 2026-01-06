import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const appointmentSchema = z.object({
  service: z.string().min(1, "Please select a service").max(200),
  date: z.string().min(1, "Please select a date"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long"),
  email: z.email("Invalid email address").optional().or(z.literal("")),
  message: z.string().max(1000, "Message is too long").optional(),
  honeypot: z.string().max(0).optional(),
});

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 60 * 60 * 1000, // 1 hour
    });
    return true;
  }

  if (entry.count >= 5) return false;
  entry.count++;
  return true;
};

// Email template (same beautiful design)
const generateEmailHTML = (data: {
  service: string;
  date: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Appointment Request</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 15px;
        }
        .field:last-of-type {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #667eea;
          display: block;
          margin-bottom: 8px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value {
          color: #333;
          font-size: 16px;
          word-wrap: break-word;
        }
        .value a {
          color: #667eea;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .message-box {
          background-color: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #667eea;
          margin-top: 8px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
          text-align: center;
          color: #6b7280;
          font-size: 13px;
        }
        .footer p {
          margin: 5px 0;
        }
        .timestamp {
          font-weight: 600;
          color: #667eea;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📅 New Appointment Request</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Service Requested</span>
            <div class="value">${data.service}</div>
          </div>
          
          <div class="field">
            <span class="label">Preferred Date</span>
            <div class="value">${data.date}</div>
          </div>
          
          <div class="field">
            <span class="label">Client Name</span>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <span class="label">Phone Number</span>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          
          ${
            data.email
              ? `
          <div class="field">
            <span class="label">Email Address</span>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          `
              : ""
          }
          
          ${
            data.message
              ? `
          <div class="field">
            <span class="label">Additional Message</span>
            <div class="message-box">${data.message}</div>
          </div>
          `
              : ""
          }
          
          <div class="footer">
            <p>This is an automated notification from your appointment booking system.</p>
            <p class="timestamp">Received: ${new Date().toLocaleString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              },
            )}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// API Route Handler
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Validate request
    const body = await request.json();
    const validation = appointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    // Honeypot check (bot detection)
    if (data.honeypot) {
      return NextResponse.json(
        { success: true, message: "Request submitted successfully" },
        { status: 200 },
      );
    }

    // Send email with Resend
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.APPOINTMENT_EMAIL_FROM!,
      to: process.env.APPOINTMENT_EMAIL_TO!,
      subject: `New Appointment: ${data.service} - ${data.name}`,
      replyTo: data.email || undefined,
      html: generateEmailHTML(data),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email notification" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment request submitted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing appointment:", error);
    return NextResponse.json(
      { error: "Failed to process appointment request" },
      { status: 500 },
    );
  }
}
