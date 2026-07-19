import { isDatabaseConfigured, prisma } from "@/lib/db";
import type { BlogPost, BlogPostFAQ } from "@/data/posts";

function toBlogPost(record: {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt: string;
  directAnswer: string;
  keyTakeaways: string[];
  contentJson: unknown;
  checklist: string[];
  faqs: unknown;
  authorName: string;
  authorRole: string;
  authorBio: string;
  reviewerName: string | null;
  reviewerRole: string | null;
  publishedDate: Date | null;
  updatedDate: Date | null;
  readingTime: string | null;
  featured: boolean;
  relatedServices: string[];
  relatedServiceSlugs: string[];
  relatedPosts: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  schemaDescription: string | null;
}): BlogPost {
  const markdown = (record.contentJson as { markdown?: string } | null)?.markdown ?? "";
  const faqs = (Array.isArray(record.faqs) ? record.faqs : []) as BlogPostFAQ[];

  return {
    title: record.title,
    slug: record.slug,
    category: record.category,
    tags: record.tags,
    excerpt: record.excerpt,
    directAnswer: record.directAnswer,
    keyTakeaways: record.keyTakeaways,
    author: {
      name: record.authorName,
      role: record.authorRole,
      bio: record.authorBio,
    },
    reviewer: record.reviewerName ? { name: record.reviewerName, role: record.reviewerRole ?? "" } : undefined,
    publishedDate: (record.publishedDate ?? new Date()).toISOString(),
    updatedDate: (record.updatedDate ?? record.publishedDate ?? new Date()).toISOString(),
    readingTime: record.readingTime ?? "",
    featured: record.featured,
    relatedServices: record.relatedServices,
    relatedServiceSlugs: record.relatedServiceSlugs,
    relatedPosts: record.relatedPosts,
    sections: markdown
      ? [{ id: "content", heading: "", body: markdown, type: "text" }]
      : [],
    checklist: record.checklist,
    faqs,
    metaTitle: record.metaTitle ?? record.title,
    metaDescription: record.metaDescription ?? record.excerpt,
    schemaDescription: record.schemaDescription ?? record.excerpt,
  };
}

export async function getPublishedDbPosts(): Promise<BlogPost[]> {
  if (!isDatabaseConfigured()) return [];

  try {
    const records = await prisma.blogPost.findMany({ where: { status: "published" } });
    return records.map(toBlogPost);
  } catch {
    return [];
  }
}

export async function getPublishedDbPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const record = await prisma.blogPost.findFirst({ where: { slug, status: "published" } });
    return record ? toBlogPost(record) : null;
  } catch {
    return null;
  }
}
