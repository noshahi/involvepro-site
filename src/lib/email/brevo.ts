import { BrevoClient } from "@getbrevo/brevo";

export function isBrevoConfigured() {
  return Boolean(
    process.env.BREVO_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.BREVO_SENDER_EMAIL,
  );
}

/** Safe to show in logs — never contains the API key or raw provider error bodies. */
export class BrevoEmailError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "BrevoEmailError";
  }
}

function getClient() {
  if (!isBrevoConfigured()) {
    throw new BrevoEmailError("Brevo is not configured on this server.");
  }
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type EmailRow = { label: string; value?: string };

function renderEmailRows(rows: EmailRow[]) {
  const filled = rows.filter((row) => row.value && row.value.trim().length > 0);

  const html = filled
    .map(
      (row) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#667085;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(row.label)}</td><td style="padding:6px 0;color:#06120D;font-size:13px;">${escapeHtml(row.value!).replace(/\n/g, "<br />")}</td></tr>`,
    )
    .join("");

  const text = filled.map((row) => `${row.label}: ${row.value}`).join("\n");

  return {
    html: `<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">${html}</table>`,
    text,
  };
}

async function sendViaBrevo(params: { subject: string; replyTo: string; html: string; text: string }) {
  const client = getClient();

  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL!,
        name: process.env.BREVO_SENDER_NAME || "involvepro",
      },
      to: [{ email: process.env.CONTACT_TO_EMAIL! }],
      replyTo: { email: params.replyTo },
      subject: params.subject,
      htmlContent: params.html,
      textContent: params.text,
    });

    return { success: true as const, messageId: result?.messageId };
  } catch (err) {
    // Log a safe, server-side-only diagnostic. Never forward provider error
    // bodies or the API key to the caller/browser.
    const statusCode = (err as { statusCode?: number })?.statusCode;
    console.error(`[brevo] Failed to send email${statusCode ? ` (status ${statusCode})` : ""}.`, err);
    throw new BrevoEmailError("Failed to send email via Brevo.", err);
  }
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  companyWebsite?: string;
  currentWebsiteUrl?: string;
  serviceNeeded?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
};

export type AuditEmailPayload = {
  name: string;
  email: string;
  company?: string;
  websiteUrl: string;
  focus?: string;
  budgetRange?: string;
  message: string;
};

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { html, text } = renderEmailRows([
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email },
    { label: "Phone", value: payload.phone },
    { label: "Company / Website", value: payload.companyWebsite },
    { label: "Current Website URL", value: payload.currentWebsiteUrl },
    { label: "Service Needed", value: payload.serviceNeeded },
    { label: "Budget Range", value: payload.budgetRange },
    { label: "Timeline", value: payload.timeline },
    { label: "Message", value: payload.message },
    { label: "Submitted", value: new Date().toISOString() },
    { label: "Source page", value: "/contact" },
  ]);

  return sendViaBrevo({
    subject: "New Website Inquiry from involvepro Contact Form",
    replyTo: payload.email,
    html,
    text,
  });
}

export async function sendAuditEmail(payload: AuditEmailPayload) {
  const { html, text } = renderEmailRows([
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email },
    { label: "Company", value: payload.company },
    { label: "Website URL", value: payload.websiteUrl },
    { label: "Audit Focus", value: payload.focus },
    { label: "Budget Range", value: payload.budgetRange },
    { label: "Message", value: payload.message },
    { label: "Submitted", value: new Date().toISOString() },
    { label: "Source page", value: "/free-audit" },
  ]);

  return sendViaBrevo({
    subject: "New Free Audit Request from involvepro Website",
    replyTo: payload.email,
    html,
    text,
  });
}
