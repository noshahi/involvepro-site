import { isDatabaseConfigured, prisma } from "@/lib/db";
import { isAdminAuthConfigured } from "@/lib/auth";
import { isBrevoConfigured } from "@/lib/email/brevo";
import { AdminCard, DbSetupNotice, EmptyState } from "@/components/admin/ui";

async function getCounts() {
  if (!isDatabaseConfigured()) return null;

  try {
    const [newContacts, newAudits, draftPosts, publishedPosts, seoRecords, redirects, activeRedirects] =
      await Promise.all([
        prisma.contactSubmission.count({ where: { status: "new" } }),
        prisma.auditRequest.count({ where: { status: "new" } }),
        prisma.blogPost.count({ where: { status: "draft" } }),
        prisma.blogPost.count({ where: { status: "published" } }),
        prisma.pageSEO.count(),
        prisma.redirect.count(),
        prisma.redirect.count({ where: { active: true } }),
      ]);
    return { newContacts, newAudits, draftPosts, publishedPosts, seoRecords, redirects, activeRedirects };
  } catch {
    return "error" as const;
  }
}

function getSetupWarnings() {
  const warnings: string[] = [];
  if (!isDatabaseConfigured()) warnings.push("DATABASE_URL is not set — admin data pages will show setup notices.");
  if (!isAdminAuthConfigured()) warnings.push("Admin login env vars (ADMIN_EMAIL/ADMIN_PASSWORD_HASH/NEXTAUTH_SECRET) are incomplete.");
  if (!isBrevoConfigured()) warnings.push("Brevo email is not configured — contact/audit notification emails will not send.");
  return warnings;
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();
  const warnings = getSetupWarnings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Overview</h1>
        <p className="text-sm text-text-muted">A quick snapshot of what needs attention.</p>
      </div>

      {warnings.length > 0 && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-medium">Setup warnings</p>
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {counts === null && <DbSetupNotice feature="dashboard metrics" />}

      {counts === "error" && (
        <DbSetupNotice feature="dashboard metrics (database reachable but schema may not be migrated yet — run `npx prisma migrate deploy`)" />
      )}

      {counts && typeof counts === "object" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard title="New Contact Submissions" value={counts.newContacts} hint="Awaiting review" />
          <AdminCard title="New Audit Requests" value={counts.newAudits} hint="Awaiting review" />
          <AdminCard title="Draft Posts" value={counts.draftPosts} />
          <AdminCard title="Published Posts" value={counts.publishedPosts} />
          <AdminCard title="SEO Records" value={counts.seoRecords} hint="Custom overrides saved" />
          <AdminCard
            title="Redirects"
            value={counts.redirects}
            hint={`${counts.activeRedirects} active · stored only, not yet applied at runtime`}
          />
        </div>
      )}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-[var(--brand-navy)]">Recent Activity</h2>
        <EmptyState
          title="Activity feed coming in Phase 7B"
          description="Recent submissions, publishes, and edits will show up here."
        />
      </div>
    </div>
  );
}
