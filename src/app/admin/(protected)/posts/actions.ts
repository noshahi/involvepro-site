"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/session";
import { blogPostSchema, parseFaqs } from "@/lib/admin-schemas";

export type PostFormState = { error?: string };

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated.");
  return session;
}

function readForm(formData: FormData) {
  return blogPostSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    excerpt: formData.get("excerpt"),
    directAnswer: formData.get("directAnswer"),
    keyTakeaways: formData.get("keyTakeaways"),
    contentMarkdown: formData.get("contentMarkdown"),
    checklist: formData.get("checklist"),
    faqsRaw: formData.get("faqsRaw"),
    authorName: formData.get("authorName"),
    authorRole: formData.get("authorRole"),
    authorBio: formData.get("authorBio"),
    reviewerName: formData.get("reviewerName"),
    reviewerRole: formData.get("reviewerRole"),
    relatedServices: formData.get("relatedServices"),
    relatedServiceSlugs: formData.get("relatedServiceSlugs"),
    relatedPosts: formData.get("relatedPosts"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
    schemaDescription: formData.get("schemaDescription"),
    canonicalUrl: formData.get("canonicalUrl"),
    ogTitle: formData.get("ogTitle"),
    ogDescription: formData.get("ogDescription"),
    ogImage: formData.get("ogImage"),
    readingTime: formData.get("readingTime"),
    noindex: formData.get("noindex") === "on",
    featured: formData.get("featured") === "on",
    status: formData.get("status"),
  });
}

export async function createPostAction(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();
  if (!isDatabaseConfigured()) return { error: "Database is not configured." };

  let data;
  try {
    data = readForm(formData);
  } catch {
    return { error: "Please check the highlighted fields." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } });
  if (existing) return { error: "That slug is already in use." };

  const faqs = parseFaqs(data.faqsRaw);
  const now = new Date();

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      tags: data.tags,
      excerpt: data.excerpt,
      directAnswer: data.directAnswer,
      keyTakeaways: data.keyTakeaways,
      contentJson: { markdown: data.contentMarkdown },
      checklist: data.checklist,
      faqs,
      authorName: data.authorName,
      authorRole: data.authorRole,
      authorBio: data.authorBio,
      reviewerName: data.reviewerName || null,
      reviewerRole: data.reviewerRole || null,
      relatedServices: data.relatedServices,
      relatedServiceSlugs: data.relatedServiceSlugs,
      relatedPosts: data.relatedPosts,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      schemaDescription: data.schemaDescription || null,
      canonicalUrl: data.canonicalUrl || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || null,
      readingTime: data.readingTime || null,
      noindex: data.noindex,
      featured: data.featured,
      status: data.status,
      publishedDate: data.status === "published" ? now : null,
      updatedDate: now,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/insights");
  redirect(`/admin/posts/${post.id}`);
}

export async function updatePostAction(
  id: string,
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAdmin();
  if (!isDatabaseConfigured()) return { error: "Database is not configured." };

  let data;
  try {
    data = readForm(formData);
  } catch {
    return { error: "Please check the highlighted fields." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } });
  if (existing && existing.id !== id) return { error: "That slug is already in use." };

  const current = await prisma.blogPost.findUnique({ where: { id } });
  if (!current) return { error: "Post not found." };

  const faqs = parseFaqs(data.faqsRaw);
  const now = new Date();
  const isNewlyPublished = data.status === "published" && current.status !== "published";

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      tags: data.tags,
      excerpt: data.excerpt,
      directAnswer: data.directAnswer,
      keyTakeaways: data.keyTakeaways,
      contentJson: { markdown: data.contentMarkdown },
      checklist: data.checklist,
      faqs,
      authorName: data.authorName,
      authorRole: data.authorRole,
      authorBio: data.authorBio,
      reviewerName: data.reviewerName || null,
      reviewerRole: data.reviewerRole || null,
      relatedServices: data.relatedServices,
      relatedServiceSlugs: data.relatedServiceSlugs,
      relatedPosts: data.relatedPosts,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      schemaDescription: data.schemaDescription || null,
      canonicalUrl: data.canonicalUrl || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || null,
      readingTime: data.readingTime || null,
      noindex: data.noindex,
      featured: data.featured,
      status: data.status,
      publishedDate: isNewlyPublished ? now : current.publishedDate,
      updatedDate: now,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
  revalidatePath("/insights");
  return { error: undefined };
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  if (!isDatabaseConfigured()) return;
  await prisma.blogPost.update({ where: { id }, data: { status: "archived" } });
  revalidatePath("/admin/posts");
  revalidatePath("/insights");
}

export async function togglePublishAction(id: string, publish: boolean) {
  await requireAdmin();
  if (!isDatabaseConfigured()) return;
  await prisma.blogPost.update({
    where: { id },
    data: {
      status: publish ? "published" : "draft",
      publishedDate: publish ? new Date() : undefined,
      updatedDate: new Date(),
    },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/insights");
}
