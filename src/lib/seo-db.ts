import { isDatabaseConfigured, prisma } from "@/lib/db";

export type PageSeoData = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  schemaType?: string;
  customJsonLd?: unknown;
};

/**
 * Returns the DB-backed PageSEO override for a path if the database is
 * configured and a record exists. Falls back to null so callers can use
 * their existing static metadata — public pages must never crash if the
 * database is unavailable.
 */
export async function getPageSEO(path: string): Promise<PageSeoData | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const record = await prisma.pageSEO.findUnique({ where: { path } });
    if (!record) return null;

    return {
      metaTitle: record.metaTitle ?? undefined,
      metaDescription: record.metaDescription ?? undefined,
      canonicalUrl: record.canonicalUrl ?? undefined,
      ogTitle: record.ogTitle ?? undefined,
      ogDescription: record.ogDescription ?? undefined,
      ogImage: record.ogImage ?? undefined,
      twitterTitle: record.twitterTitle ?? undefined,
      twitterDescription: record.twitterDescription ?? undefined,
      twitterImage: record.twitterImage ?? undefined,
      noindex: record.noindex,
      nofollow: record.nofollow,
      schemaType: record.schemaType ?? undefined,
      customJsonLd: record.customJsonLd ?? undefined,
    };
  } catch {
    return null;
  }
}
