"use client";

import { useTransition } from "react";

const STATUSES = ["new", "reviewed", "replied", "archived"];

export default function StatusSelect({
  id,
  status,
  action,
}: {
  id: string;
  status: string;
  action: (id: string, status: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(() => action(id, e.target.value))}
      className="rounded-md border border-border-soft px-2 py-1 text-xs capitalize outline-none focus:border-brand-green"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
