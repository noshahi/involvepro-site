import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { isBrevoConfigured, sendContactEmail } from "@/lib/email/brevo";
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

  if (!isBrevoConfigured()) {
    if (dbSaved) {
      return NextResponse.json({ success: true });
    }
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[contact] Email is not configured. Set BREVO_API_KEY, CONTACT_TO_EMAIL, and BREVO_SENDER_EMAIL.",
      );
      return NextResponse.json(
        { error: "Email is not configured on this server. Set BREVO_API_KEY, CONTACT_TO_EMAIL, and BREVO_SENDER_EMAIL." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again or schedule a meeting directly." },
      { status: 500 },
    );
  }

  try {
    await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      companyWebsite: data.companyWebsite,
      currentWebsiteUrl: data.currentWebsiteUrl,
      serviceNeeded: data.serviceNeeded,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      message: data.message,
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
