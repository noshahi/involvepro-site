import { Resend } from "resend";

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

export async function sendNotificationEmail(params: {
  subject: string;
  replyTo: string;
  html: string;
  text: string;
}) {
  if (!isEmailConfigured()) {
    throw new Error("Email is not configured on this server.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: params.replyTo,
    subject: params.subject,
    html: params.html,
    text: params.text,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send email.");
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderEmailRows(rows: { label: string; value?: string }[]) {
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
