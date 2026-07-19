import type { ReactNode } from "react";

export function AdminCard({ title, value, hint }: { title: string; value: ReactNode; hint?: string }) {
  return (
    <div className="rounded-lg border border-border-soft bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--brand-navy)]">{value}</p>
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  in_review: "bg-amber-100 text-amber-700",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-brand-green-soft text-brand-green-deep",
  archived: "bg-gray-100 text-gray-500",
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-amber-100 text-amber-700",
  replied: "bg-brand-green-soft text-brand-green-deep",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border-soft bg-white p-10 text-center">
      <p className="text-sm font-medium text-[var(--brand-navy)]">{title}</p>
      {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
    </div>
  );
}

export function DbSetupNotice({ feature }: { feature: string }) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 text-sm text-amber-800">
      <p className="font-medium">Database not configured</p>
      <p className="mt-1">
        Set <code>DATABASE_URL</code> in your environment to enable {feature}. See{" "}
        <code>docs/admin-setup.md</code> for setup steps.
      </p>
    </div>
  );
}
