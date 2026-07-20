import Link from "next/link";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice, EmptyState } from "@/components/admin/ui";
import StatusSelect from "../submissions/status-select";
import { updateAuditStatusAction } from "./actions";

const STATUSES = ["new", "reviewed", "replied", "archived"];

export default async function AuditRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <DbSetupNotice feature="audit requests" />
      </div>
    );
  }

  const requests = await prisma.auditRequest.findMany({
    where: {
      status: status ? (status as never) : undefined,
      OR: q
        ? [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }]
        : undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  const hasFilters = Boolean(q || status);

  return (
    <div className="space-y-6">
      <Header />

      <form className="flex flex-wrap gap-3">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by name or email…"
          className="w-full max-w-xs rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md border border-border-soft px-4 py-2 text-sm font-medium text-[var(--brand-navy)] hover:bg-canvas-soft"
        >
          Filter
        </button>
        {hasFilters && (
          <Link
            href="/admin/audit-requests"
            className="rounded-md px-4 py-2 text-sm font-medium text-text-muted hover:bg-canvas-soft"
          >
            Clear
          </Link>
        )}
      </form>

      {requests.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No audit requests match your filters" : "No audit requests yet"}
          description={hasFilters ? "Try a different search term or clear the filters." : "Free audit form entries will appear here."}
        />
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
