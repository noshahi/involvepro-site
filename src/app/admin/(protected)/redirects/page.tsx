import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice, EmptyState } from "@/components/admin/ui";
import RedirectForm from "./redirect-form";
import ActiveToggle from "./active-toggle";

export default async function RedirectsPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <DbSetupNotice feature="redirect management" />
      </div>
    );
  }

  const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <Header />
      <RedirectForm />

      {redirects.length === 0 ? (
        <EmptyState title="No redirects yet" description="Redirects created here are not yet wired into runtime routing (planned for Phase 7B)." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border-soft bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border-soft bg-canvas-soft text-xs uppercase text-text-muted">
              <tr>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {redirects.map((r) => (
                <tr key={r.id} className="border-b border-border-soft last:border-0">
                  <td className="px-4 py-3 font-medium text-[var(--brand-navy)]">{r.sourcePath}</td>
                  <td className="px-4 py-3 text-text-muted">{r.destinationUrl}</td>
                  <td className="px-4 py-3 text-text-muted">{r.type === "R301" ? "301" : "302"}</td>
                  <td className="px-4 py-3">
                    <ActiveToggle id={r.id} active={r.active} />
                  </td>
                  <td className="px-4 py-3 text-text-muted">{r.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-text-muted">
        Note: redirects are stored but not yet applied at runtime. This is documented as pending work for
        Phase 7B in <code>docs/admin-setup.md</code>.
      </p>
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Redirects</h1>
      <p className="text-sm text-text-muted">Manage source-to-destination redirect records.</p>
    </div>
  );
}
