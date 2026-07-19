"use client";

import { useTransition } from "react";
import { toggleRedirectActiveAction } from "./actions";

export default function ActiveToggle({ id, active }: { id: string; active: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleRedirectActiveAction(id, !active))}
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active ? "bg-brand-green-soft text-brand-green-deep" : "bg-gray-100 text-gray-500"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </button>
  );
}
