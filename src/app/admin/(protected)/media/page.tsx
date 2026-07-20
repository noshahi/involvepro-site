import { EmptyState } from "@/components/admin/ui";
import { siteImages, type SiteImageCategory } from "@/data/media";

const CATEGORY_NOTES: Record<SiteImageCategory, string> = {
  team: "Home proof/testimonial strip, About story section",
  process: "Process communication section, ProcessOverviewRail, CommunicationModel",
  strategy: "Process discovery/strategy panels, RequirementGathering",
  development: "Service detail pages (Shopify/WordPress/full-stack), ProjectServicesDelivered",
  ecommerce: "Shopify/CRO service pages, ecommerce case studies",
  support: "Website Maintenance & Support service page, ProcessQualityAssurance",
  office: "About page, Contact trust panel",
  project: "Work project detail pages, as a supplement to abstract visuals",
  "client-work": "Work list/detail pages, case study proof blocks",
  meeting: "Contact trust panel, Schedule a Meeting / Calendly context",
  audit: "Free Audit value section",
  automation: "AI/automation service pages, Services hero visuals",
};

export default function MediaPage() {
  const categories = Object.keys(CATEGORY_NOTES) as SiteImageCategory[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Media</h1>
        <p className="text-sm text-text-muted">Media library and uploads.</p>
      </div>

      <EmptyState
        title="Media uploads not yet configured"
        description="File uploads require a storage provider — Cloudinary, Vercel Blob, or Supabase Storage. The MediaAsset model already exists in the database, but the upload UI is planned for a later phase once a provider is wired up."
      />

      <div className="rounded-lg border border-border-soft bg-white p-5">
        <p className="text-sm font-medium text-[var(--brand-navy)]">
          Recommended image categories ({siteImages.length} assets currently registered)
        </p>
        <p className="mt-1 text-xs text-text-muted">
          From <code>src/data/media.ts</code> — the planned placement for each category once real photography is added.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-border-soft text-xs uppercase text-text-muted">
              <tr>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2">Suggested placement</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c} className="border-b border-border-soft last:border-0">
                  <td className="py-2 pr-4 font-medium capitalize text-[var(--brand-navy)]">{c}</td>
                  <td className="py-2 text-text-muted">{CATEGORY_NOTES[c]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
