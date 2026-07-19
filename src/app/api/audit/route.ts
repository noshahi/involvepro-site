import { NextResponse } from "next/server";
import { auditSchema } from "@/lib/schemas";
import { isBrevoConfigured, sendAuditEmail } from "@/lib/email/brevo";
import { isDatabaseConfigured, prisma } from "@/lib/db";

const recentSubmissions = new Map<string, number>();
const THROTTLE_WINDOW_MS = 15_000;

function getClientKey(req: Request) {
  return req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const clientKey = getClientKey(req);
  const now = Date.now();
  const last = recentSubmissions.get(clientKey);
  if (last && now - last < THROTTLE_WINDOW_MS) {
    return NextResponse.json(
      { error: "Please wait a moment before submitting again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  recentSubmissions.set(clientKey, now);

  const data = parsed.data;

  // Honeypot: silently succeed without sending an email or touching config.
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  let dbSaved = false;
  if (isDatabaseConfigured()) {
    try {
      await prisma.auditRequest.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company ?? null,
          websiteUrl: data.websiteUrl,
          focus: data.focus,
          budgetRange: data.budgetRange ?? null,
          message: data.message,
          sourcePage: "/free-audit",
        },
      });
      dbSaved = true;
    } catch (err) {
      console.error("[audit] Failed to save submission to database:", err);
    }
  }

  if (!isBrevoConfigured()) {
    if (dbSaved) {
      return NextResponse.json({ success: true });
    }
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[audit] Email is not configured. Set BREVO_API_KEY, CONTACT_TO_EMAIL, and BREVO_SENDER_EMAIL.",
      );
      return NextResponse.json(
        { error: "Email is not configured on this server. Set BREVO_API_KEY, CONTACT_TO_EMAIL, and BREVO_SENDER_EMAIL." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Something went wrong while sending your audit request. Please try again or schedule a meeting directly." },
      { status: 500 },
    );
  }

  try {
    await sendAuditEmail({
      name: data.name,
      email: data.email,
      company: data.company,
      websiteUrl: data.websiteUrl,
      focus: data.focus,
      budgetRange: data.budgetRange,
      message: data.message,
    });
  } catch (err) {
    console.error("[audit] Failed to send email:", err);
    if (dbSaved) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "Something went wrong while sending your audit request. Please try again or schedule a meeting directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
