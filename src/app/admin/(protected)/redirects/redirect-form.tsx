"use client";

import { useActionState } from "react";
import { createRedirectAction, type RedirectFormState } from "./actions";

const inputClass =
  "w-full rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green";

export default function RedirectForm() {
  const [state, formAction, pending] = useActionState<RedirectFormState, FormData>(createRedirectAction, {});

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 rounded-lg border border-border-soft bg-white p-5 md:grid-cols-2">
      {state.error && (
        <p className="md:col-span-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-text-muted">Source Path</span>
        <input name="sourcePath" placeholder="/old-page" className={inputClass} required />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-text-muted">Destination URL</span>
        <input name="destinationUrl" placeholder="/new-page" className={inputClass} required />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-text-muted">Type</span>
        <select name="type" defaultValue="R301" className={inputClass}>
          <option value="R301">301 (Permanent)</option>
          <option value="R302">302 (Temporary)</option>
        </select>
      </label>
      <label className="flex items-center gap-2 pt-6 text-sm">
        <input type="checkbox" name="active" defaultChecked />
        Active
      </label>
      <label className="block md:col-span-2">
        <span className="mb-1 block text-xs font-medium text-text-muted">Notes</span>
        <input name="notes" className={inputClass} />
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-deep disabled:opacity-60"
        >
          {pending ? "Adding…" : "Add Redirect"}
        </button>
      </div>
    </form>
  );
}
