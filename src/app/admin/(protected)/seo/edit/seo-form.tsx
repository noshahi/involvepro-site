"use client";

import { useActionState } from "react";
import { upsertPageSeoAction, type SeoFormState } from "../actions";

type SeoFormValues = {
  path: string;
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  noindex: boolean;
  nofollow: boolean;
  schemaType: string;
  customJsonLd: string;
};

const inputClass =
  "w-full rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function SeoForm({ initialValues }: { initialValues: SeoFormValues }) {
  const [state, formAction, pending] = useActionState<SeoFormState, FormData>(upsertPageSeoAction, {});

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-border-soft bg-white p-5">
      <input type="hidden" name="path" value={initialValues.path} />

      {state.error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Field label="Page Name">
        <input name="pageName" defaultValue={initialValues.pageName} className={inputClass} required />
      </Field>
      <Field label="Meta Title">
        <input name="metaTitle" defaultValue={initialValues.metaTitle} className={inputClass} />
      </Field>
      <Field label="Meta Description">
        <textarea name="metaDescription" rows={2} defaultValue={initialValues.metaDescription} className={inputClass} />
      </Field>
      <Field label="Canonical URL">
        <input name="canonicalUrl" defaultValue={initialValues.canonicalUrl} className={inputClass} />
      </Field>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="OG Title">
          <input name="ogTitle" defaultValue={initialValues.ogTitle} className={inputClass} />
        </Field>
        <Field label="OG Image">
          <input name="ogImage" defaultValue={initialValues.ogImage} className={inputClass} />
        </Field>
      </div>
      <Field label="OG Description">
        <textarea name="ogDescription" rows={2} defaultValue={initialValues.ogDescription} className={inputClass} />
      </Field>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Twitter Title">
          <input name="twitterTitle" defaultValue={initialValues.twitterTitle} className={inputClass} />
        </Field>
        <Field label="Twitter Image">
          <input name="twitterImage" defaultValue={initialValues.twitterImage} className={inputClass} />
        </Field>
      </div>
      <Field label="Twitter Description">
        <textarea
          name="twitterDescription"
          rows={2}
          defaultValue={initialValues.twitterDescription}
          className={inputClass}
        />
      </Field>
      <Field label="Schema Type">
        <input name="schemaType" defaultValue={initialValues.schemaType} className={inputClass} />
      </Field>
      <Field label="Custom JSON-LD Override (valid JSON)">
        <textarea
          name="customJsonLd"
          rows={5}
          defaultValue={initialValues.customJsonLd}
          className={`${inputClass} font-mono`}
        />
      </Field>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="noindex" defaultChecked={initialValues.noindex} />
          Noindex
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="nofollow" defaultChecked={initialValues.nofollow} />
          Nofollow
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-deep disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
