"use client";

import { useActionState } from "react";
import { saveSettingsAction, type SettingsFormState } from "./actions";
import { SITE_SETTING_KEYS, SITE_SETTING_LABELS } from "@/lib/site-settings";

const inputClass =
  "w-full rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green";

export default function SettingsForm({ values }: { values: Record<string, string> }) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(saveSettingsAction, {});

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-border-soft bg-white p-5">
      {state.error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-md border border-brand-green/30 bg-brand-green-soft px-3 py-2 text-sm text-brand-green-deep">
          Settings saved.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SITE_SETTING_KEYS.filter((k) => k !== "footerDescription").map((key) => (
          <label key={key} className="block">
            <span className="mb-1 block text-xs font-medium text-text-muted">{SITE_SETTING_LABELS[key]}</span>
            <input name={key} defaultValue={values[key] ?? ""} className={inputClass} />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-text-muted">Footer Description</span>
        <textarea name="footerDescription" rows={3} defaultValue={values.footerDescription ?? ""} className={inputClass} />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-deep disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
