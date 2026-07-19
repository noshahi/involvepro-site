import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .max(200)
  .optional()
  .or(z.literal(""))
  .transform((val) => (val ? val : undefined))
  .refine(
    (val) => !val || /^([a-z0-9-]+\.)+[a-z]{2,}([/?#].*)?$/i.test(val.replace(/^https?:\/\//i, "")),
    { message: "Enter a valid domain or URL." },
  );

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  companyWebsite: z.string().trim().min(2, "Tell us your company or website.").max(200),
  currentWebsiteUrl: optionalUrl,
  serviceNeeded: z.string().trim().min(1, "Select the service you need."),
  budgetRange: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  timeline: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  message: z.string().trim().min(20, "Add a few more details (20+ characters) so we can help.").max(4000),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const auditSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  websiteUrl: z
    .string()
    .trim()
    .min(2, "Enter your website URL.")
    .max(200)
    .refine(
      (val) => /^([a-z0-9-]+\.)+[a-z]{2,}([/?#].*)?$/i.test(val.replace(/^https?:\/\//i, "")),
      { message: "Enter a valid domain or URL." },
    ),
  focus: z.string().trim().min(1, "Select what we should focus on."),
  budgetRange: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  message: z.string().trim().min(20, "Add a few more details (20+ characters) so we can help.").max(4000),
  honeypot: z.string().trim().max(200).optional().or(z.literal("")),
});

export type AuditPayload = z.infer<typeof auditSchema>;
