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
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border-soft bg-canvas-soft text-xs uppercase text-text-muted">
            <tr>
              <th className="px-4 py-3">Page</th>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">Meta Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {KEY_PAGES.map((page) => {
              const record = byPath.get(page.path);
              return (
                <tr key={page.path} className="border-b border-border-soft last:border-0">
                  <td className="px-4 py-3 font-medium text-[var(--brand-navy)]">{page.pageName}</td>
                  <td className="px-4 py-3 text-text-muted">{page.path}</td>
                  <td className="px-4 py-3 text-text-muted">{record?.metaTitle || "—"}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {record ? "Custom override set" : "Using static default"}
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

function Header() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">SEO Manager</h1>
      <p className="text-sm text-text-muted">Override metadata for key site pages.</p>
    </div>
  );
}
