import Link from "next/link";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice, EmptyState } from "@/components/admin/ui";
import StatusSelect from "./status-select";
import { updateContactStatusAction } from "./actions";

const STATUSES = ["new", "reviewed", "replied", "archived"];

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <DbSetupNotice feature="contact submissions" />
      </div>
    );
  }

  const submissions = await prisma.contactSubmission.findMany({
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
            href="/admin/submissions"
            className="rounded-md px-4 py-2 text-sm font-medium text-text-muted hover:bg-canvas-soft"
          >
            Clear
          </Link>
        )}
      </form>

      {submissions.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No submissions match your filters" : "No submissions yet"}
          description={hasFilters ? "Try a different search term or clear the filters." : "Contact form entries will appear here."}
        />
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <details key={s.id} className="rounded-lg border border-border-soft bg-white p-4">
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-[var(--brand-navy)]">{s.name}</p>
                  <p className="text-xs text-text-muted">
                    {s.email} · {s.serviceNeeded ?? "—"} · {s.budgetRange ?? "—"} ·{" "}
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
                <StatusSelect id={s.id} status={s.status} action={updateContactStatusAction} />
              </summary>
              <div className="mt-3 space-y-1 border-t border-border-soft pt-3 text-sm text-text-main">
                {s.phone && <p><span className="text-text-muted">Phone:</span> {s.phone}</p>}
                {s.companyWebsite && <p><span className="text-text-muted">Company/Website:</span> {s.companyWebsite}</p>}
                {s.currentWebsiteUrl && <p><span className="text-text-muted">Current Website:</span> {s.currentWebsiteUrl}</p>}
                {s.timeline && <p><span className="text-text-muted">Timeline:</span> {s.timeline}</p>}
                <p className="whitespace-pre-wrap"><span className="text-text-muted">Message:</span> {s.message}</p>
                {s.sourcePage && <p className="text-xs text-text-muted">Source: {s.sourcePage}</p>}
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
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Contact Submissions</h1>
      <p className="text-sm text-text-muted">Inquiries from the contact form.</p>
    </div>
  );
}
