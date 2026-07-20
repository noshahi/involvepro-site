import Link from "next/link";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice } from "@/components/admin/ui";

const KEY_PAGES = [
  { path: "/", pageName: "Home" },
  { path: "/services/", pageName: "Services" },
  { path: "/work/", pageName: "Work" },
  { path: "/process/", pageName: "Process" },
  { path: "/insights/", pageName: "Insights" },
  { path: "/contact/", pageName: "Contact" },
  { path: "/free-audit/", pageName: "Free Audit" },
];

export default async function SeoManagerPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <DbSetupNotice feature="the SEO manager" />
      </div>
    );
  }

  const records = await prisma.pageSEO.findMany();
  const byPath = new Map(records.map((r) => [r.path, r]));

  return (
    <div className="space-y-6">
      <Header />
      <div className="overflow-x-auto rounded-lg border border-border-soft bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border-soft bg-canvas-soft text-xs uppercase text-text-muted">
            <tr>
              <th className="px-4 py-3">Page</th>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">Override</th>
              <th className="px-4 py-3">Checks</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {KEY_PAGES.map((page) => {
              const record = byPath.get(page.path);
              return (
                <tr key={page.path} className="border-b border-border-soft last:border-0 align-top">
                  <td className="px-4 py-3 font-medium text-[var(--brand-navy)]">{page.pageName}</td>
                  <td className="px-4 py-3 text-text-muted">{page.path}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {record ? "Custom override set" : "Using static default"}
                  </td>
                  <td className="px-4 py-3">
                    <CheckList record={record} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/seo/edit?path=${encodeURIComponent(page.path)}&pageName=${encodeURIComponent(page.pageName)}`}
                      className="text-brand-green hover:underline"
                    >
                      {record ? "Edit" : "Create"}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type SeoRecord = {
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  noindex: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
} | undefined;

function CheckList({ record }: { record: SeoRecord }) {
  const checks: { label: string; ok: boolean }[] = [
    { label: "Meta title", ok: Boolean(record?.metaTitle) },
    { label: "Meta description", ok: Boolean(record?.metaDescription) },
    { label: "Canonical", ok: Boolean(record?.canonicalUrl) },
    { label: "OG data", ok: Boolean(record?.ogTitle || record?.ogDescription || record?.ogImage) },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {checks.map((c) => (
        <span
          key={c.label}
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            c.ok ? "bg-brand-green-soft text-brand-green-deep" : "bg-gray-100 text-gray-500"
          }`}
        >
          {c.ok ? "✓" : "–"} {c.label}
        </span>
      ))}
      {record?.noindex && (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
          Noindex
        </span>
      )}
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">SEO Manager</h1>
      <p className="text-sm text-text-muted">Override metadata for key site pages.</p>
    </div>
  );
}
