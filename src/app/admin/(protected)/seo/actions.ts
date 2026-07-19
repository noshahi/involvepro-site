"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/session";
import { pageSeoSchema } from "@/lib/admin-schemas";

export type SeoFormState = { error?: string };

export async function upsertPageSeoAction(_prev: SeoFormState, formData: FormData): Promise<SeoFormState> {
  const session = await getSession();
  if (!session) return { error: "Not authenticated." };
  if (!isDatabaseConfigured()) return { error: "Database is not configured." };

  const parsed = pageSeoSchema.safeParse({
    path: formData.get("path"),
    pageName: formData.get("pageName"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
    canonicalUrl: formData.get("canonicalUrl"),
    ogTitle: formData.get("ogTitle"),
    ogDescription: formData.get("ogDescription"),
    ogImage: formData.get("ogImage"),
    twitterTitle: formData.get("twitterTitle"),
    twitterDescription: formData.get("twitterDescription"),
    twitterImage: formData.get("twitterImage"),
    noindex: formData.get("noindex") === "on",
    nofollow: formData.get("nofollow") === "on",
    schemaType: formData.get("schemaType"),
    customJsonLd: formData.get("customJsonLd"),
  });

  if (!parsed.success) {
    return { error: "Please check the highlighted fields." };
  }

  const data = parsed.data;

  let customJsonLd: object | undefined;
  if (data.customJsonLd) {
    try {
      customJsonLd = JSON.parse(data.customJsonLd);
    } catch {
      return { error: "Custom JSON-LD must be valid JSON." };
    }
  }

  await prisma.pageSEO.upsert({
    where: { path: data.path },
    update: {
      pageName: data.pageName,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      canonicalUrl: data.canonicalUrl || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || null,
      twitterTitle: data.twitterTitle || null,
      twitterDescription: data.twitterDescription || null,
      twitterImage: data.twitterImage || null,
      noindex: data.noindex,
      nofollow: data.nofollow,
      schemaType: data.schemaType || null,
      customJsonLd: customJsonLd ?? undefined,
    },
    create: {
      path: data.path,
      pageName: data.pageName,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      canonicalUrl: data.canonicalUrl || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || null,
      twitterTitle: data.twitterTitle || null,
      twitterDescription: data.twitterDescription || null,
      twitterImage: data.twitterImage || null,
      noindex: data.noindex,
      nofollow: data.nofollow,
      schemaType: data.schemaType || null,
      customJsonLd: customJsonLd ?? undefined,
    },
  });

  revalidatePath("/admin/seo");
  revalidatePath(data.path);
  redirect("/admin/seo");
}
