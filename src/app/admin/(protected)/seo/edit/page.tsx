import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice } from "@/components/admin/ui";
import SeoForm from "./seo-form";

export default async function EditSeoPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; pageName?: string }>;
}) {
  const { path, pageName } = await searchParams;

  if (!path) {
    return <p className="text-sm text-text-muted">Missing page path.</p>;
  }

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Edit SEO — {path}</h1>
        <DbSetupNotice feature="the SEO manager" />
      </div>
    );
  }

  const record = await prisma.pageSEO.findUnique({ where: { path } });

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Edit SEO — {path}</h1>
      <SeoForm
        initialValues={{
          path,
          pageName: record?.pageName ?? pageName ?? "",
          metaTitle: record?.metaTitle ?? "",
          metaDescription: record?.metaDescription ?? "",
          canonicalUrl: record?.canonicalUrl ?? "",
          ogTitle: record?.ogTitle ?? "",
          ogDescription: record?.ogDescription ?? "",
          ogImage: record?.ogImage ?? "",
          twitterTitle: record?.twitterTitle ?? "",
          twitterDescription: record?.twitterDescription ?? "",
          twitterImage: record?.twitterImage ?? "",
          noindex: record?.noindex ?? false,
          nofollow: record?.nofollow ?? false,
          schemaType: record?.schemaType ?? "",
          customJsonLd: record?.customJsonLd ? JSON.stringify(record.customJsonLd, null, 2) : "",
        }}
      />
    </div>
  );
}
