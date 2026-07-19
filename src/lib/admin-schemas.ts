import { z } from "zod";

function csv() {
  return z
    .string()
    .optional()
    .transform((v) =>
      (v ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
}

function lines() {
  return z
    .string()
    .optional()
    .transform((v) =>
      (v ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    );
}

export function parseFaqs(raw: string): { question: string; answer: string }[] {
  const blocks = raw
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const faqs: { question: string; answer: string }[] = [];
  for (const block of blocks) {
    const qMatch = block.match(/^Q:\s*(.+)/im);
    const aMatch = block.match(/^A:\s*(.+)/im);
    if (qMatch && aMatch) {
      faqs.push({ question: qMatch[1].trim(), answer: aMatch[1].trim() });
    }
  }
  return faqs;
}

export function formatFaqs(faqs: { question: string; answer: string }[]): string {
  return faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
}

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogPostSchema = z.object({
  title: z.string().trim().min(3, "Title is required.").max(200),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .max(200)
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only."),
  category: z.string().trim().min(1, "Category is required."),
  tags: csv(),
  excerpt: z.string().trim().min(1, "Excerpt is required.").max(400),
  directAnswer: z.string().trim().max(600).optional().default(""),
  keyTakeaways: lines(),
  contentMarkdown: z.string().optional().default(""),
  checklist: lines(),
  faqsRaw: z.string().optional().default(""),
  authorName: z.string().trim().min(1, "Author name is required."),
  authorRole: z.string().trim().optional().default(""),
  authorBio: z.string().trim().optional().default(""),
  reviewerName: z.string().trim().optional().default(""),
  reviewerRole: z.string().trim().optional().default(""),
  relatedServices: csv(),
  relatedServiceSlugs: csv(),
  relatedPosts: csv(),
  metaTitle: z.string().trim().max(200).optional().default(""),
  metaDescription: z.string().trim().max(300).optional().default(""),
  schemaDescription: z.string().trim().max(300).optional().default(""),
  canonicalUrl: z.string().trim().max(300).optional().default(""),
  ogTitle: z.string().trim().max(200).optional().default(""),
  ogDescription: z.string().trim().max(300).optional().default(""),
  ogImage: z.string().trim().max(300).optional().default(""),
  readingTime: z.string().trim().max(30).optional().default(""),
  noindex: z.coerce.boolean().optional().default(false),
  featured: z.coerce.boolean().optional().default(false),
  status: z.enum(["draft", "in_review", "scheduled", "published", "archived"]).default("draft"),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const pageSeoSchema = z.object({
  path: z.string().trim().min(1, "Path is required."),
  pageName: z.string().trim().min(1, "Page name is required."),
  metaTitle: z.string().trim().max(200).optional().default(""),
  metaDescription: z.string().trim().max(300).optional().default(""),
  canonicalUrl: z.string().trim().max(300).optional().default(""),
  ogTitle: z.string().trim().max(200).optional().default(""),
  ogDescription: z.string().trim().max(300).optional().default(""),
  ogImage: z.string().trim().max(300).optional().default(""),
  twitterTitle: z.string().trim().max(200).optional().default(""),
  twitterDescription: z.string().trim().max(300).optional().default(""),
  twitterImage: z.string().trim().max(300).optional().default(""),
  noindex: z.coerce.boolean().optional().default(false),
  nofollow: z.coerce.boolean().optional().default(false),
  schemaType: z.string().trim().max(60).optional().default(""),
  customJsonLd: z.string().trim().optional().default(""),
});

export type PageSeoInput = z.infer<typeof pageSeoSchema>;

export const submissionStatusSchema = z.enum(["new", "reviewed", "replied", "archived"]);

export const redirectSchema = z.object({
  sourcePath: z.string().trim().min(1, "Source path is required."),
  destinationUrl: z.string().trim().min(1, "Destination URL is required."),
  type: z.enum(["R301", "R302"]).default("R301"),
  active: z.coerce.boolean().optional().default(true),
  notes: z.string().trim().max(500).optional().default(""),
});
