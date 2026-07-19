import { isDatabaseConfigured, prisma } from "@/lib/db";
import { AdminCard, DbSetupNotice, EmptyState } from "@/components/admin/ui";

async function getCounts() {
  if (!isDatabaseConfigured()) return null;

  try {
    const [newContacts, newAudits, draftPosts, publishedPosts, missingMeta] = await Promise.all([
      prisma.contactSubmission.count({ where: { status: "new" } }),
      prisma.auditRequest.count({ where: { status: "new" } }),
      prisma.blogPost.count({ where: { status: "draft" } }),
      prisma.blogPost.count({ where: { status: "published" } }),
      prisma.pageSEO.count({ where: { OR: [{ metaDescription: null }, { metaDescription: "" }] } }),
    ]);
    return { newContacts, newAudits, draftPosts, publishedPosts, missingMeta };
  } catch {
    return "error" as const;
  }
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Overview</h1>
        <p className="text-sm text-text-muted">A quick snapshot of what needs attention.</p>
      </div>

      {counts === null && <DbSetupNotice feature="dashboard metrics" />}

      {counts === "error" && (
        <DbSetupNotice feature="dashboard metrics (database reachable but schema may not be migrated yet — run `npx prisma migrate deploy`)" />
      )}

      {counts && typeof counts === "object" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard title="New Contact Submissions" value={counts.newContacts} />
          <AdminCard title="New Audit Requests" value={counts.newAudits} />
          <AdminCard title="Draft Posts" value={counts.draftPosts} />
          <AdminCard title="Published Posts" value={counts.publishedPosts} />
          <AdminCard title="Pages Missing Meta Descriptions" value={counts.missingMeta} />
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
