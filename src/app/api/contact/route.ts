import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { isEmailConfigured, sendNotificationEmail, renderEmailRows } from "@/lib/email";
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

  const parsed = contactSchema.safeParse(body);
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

  let dbSaved = false;
  if (isDatabaseConfigured()) {
    try {
      await prisma.contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          companyWebsite: data.companyWebsite,
          currentWebsiteUrl: data.currentWebsiteUrl ?? null,
          serviceNeeded: data.serviceNeeded,
          budgetRange: data.budgetRange ?? null,
          timeline: data.timeline ?? null,
          message: data.message,
          sourcePage: "/contact",
        },
      });
      dbSaved = true;
    } catch (err) {
      console.error("[contact] Failed to save submission to database:", err);
    }
  }

  if (!isEmailConfigured()) {
    if (dbSaved) {
      return NextResponse.json({ success: true });
    }
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[contact] Email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
      );
      return NextResponse.json(
        { error: "Email is not configured on this server. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again or schedule a meeting directly." },
      { status: 500 },
    );
  }

  const { html, text } = renderEmailRows([
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Company / Website", value: data.companyWebsite },
    { label: "Current Website URL", value: data.currentWebsiteUrl },
    { label: "Service Needed", value: data.serviceNeeded },
    { label: "Budget Range", value: data.budgetRange },
    { label: "Timeline", value: data.timeline },
    { label: "Message", value: data.message },
    { label: "Submitted", value: new Date().toISOString() },
    { label: "Source page", value: "/contact" },
  ]);

  try {
    await sendNotificationEmail({
      subject: "New Website Inquiry from involvepro Contact Form",
      replyTo: data.email,
      html,
      text,
    });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    if (dbSaved) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again or schedule a meeting directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
