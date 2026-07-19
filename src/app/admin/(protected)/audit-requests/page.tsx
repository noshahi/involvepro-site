import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice, EmptyState } from "@/components/admin/ui";
import StatusSelect from "../submissions/status-select";
import { updateAuditStatusAction } from "./actions";

export default async function AuditRequestsPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <DbSetupNotice feature="audit requests" />
      </div>
    );
  }

  const requests = await prisma.auditRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Header />

      {requests.length === 0 ? (
        <EmptyState title="No audit requests yet" description="Free audit form entries will appear here." />
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <details key={r.id} className="rounded-lg border border-border-soft bg-white p-4">
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-[var(--brand-navy)]">{r.name}</p>
                  <p className="text-xs text-text-muted">
                    {r.email} · {r.websiteUrl} · {r.focus ?? "—"} · {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
                <StatusSelect id={r.id} status={r.status} action={updateAuditStatusAction} />
              </summary>
              <div className="mt-3 space-y-1 border-t border-border-soft pt-3 text-sm text-text-main">
                {r.company && <p><span className="text-text-muted">Company:</span> {r.company}</p>}
                {r.budgetRange && <p><span className="text-text-muted">Budget:</span> {r.budgetRange}</p>}
                <p className="whitespace-pre-wrap"><span className="text-text-muted">Message:</span> {r.message}</p>
                {r.sourcePage && <p className="text-xs text-text-muted">Source: {r.sourcePage}</p>}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Audit Requests</h1>
      <p className="text-sm text-text-muted">Requests from the Free Audit page.</p>
    </div>
  );
}
