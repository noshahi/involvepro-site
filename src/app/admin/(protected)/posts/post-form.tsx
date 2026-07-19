"use client";

import { useActionState, useState } from "react";
import { slugify } from "@/lib/slug";
import type { PostFormState } from "./actions";

export type PostFormValues = {
  title: string;
  slug: string;
  category: string;
  tags: string;
  excerpt: string;
  directAnswer: string;
  keyTakeaways: string;
  contentMarkdown: string;
  checklist: string;
  faqsRaw: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  reviewerName: string;
  reviewerRole: string;
  relatedServices: string;
  relatedServiceSlugs: string;
  relatedPosts: string;
  metaTitle: string;
  metaDescription: string;
  schemaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  readingTime: string;
  noindex: boolean;
  featured: boolean;
  status: string;
};

const CATEGORIES = [
  "Shopify",
  "WordPress",
  "SEO",
  "AEO/GEO",
  "AI Automation",
  "SaaS",
  "Full Stack Development",
  "UI/UX",
  "Ecommerce Growth",
  "Website Maintenance",
];

const STATUSES = ["draft", "in_review", "scheduled", "published", "archived"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green";

export default function PostForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  initialValues: PostFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(initialValues.title);
  const [slug, setSlug] = useState(initialValues.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues.slug));

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border-soft bg-white p-5 md:grid-cols-2">
        <Field label="Title">
          <input
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Slug">
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <select name="category" defaultValue={initialValues.category} className={inputClass} required>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tags (comma separated)">
          <input name="tags" defaultValue={initialValues.tags} className={inputClass} />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={initialValues.status} className={inputClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Reading Time (e.g. 8 min read)">
          <input name="readingTime" defaultValue={initialValues.readingTime} className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={initialValues.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="noindex" defaultChecked={initialValues.noindex} />
          Noindex
        </label>
      </section>

      <section className="space-y-4 rounded-lg border border-border-soft bg-white p-5">
        <Field label="Excerpt">
          <textarea name="excerpt" rows={2} defaultValue={initialValues.excerpt} className={inputClass} required />
        </Field>
        <Field label="Direct Answer (AEO)">
          <textarea name="directAnswer" rows={2} defaultValue={initialValues.directAnswer} className={inputClass} />
        </Field>
        <Field label="Key Takeaways (one per line)">
          <textarea
            name="keyTakeaways"
            rows={4}
            defaultValue={initialValues.keyTakeaways}
            className={inputClass}
          />
        </Field>
        <Field label="Content (Markdown)">
          <textarea
            name="contentMarkdown"
            rows={16}
            defaultValue={initialValues.contentMarkdown}
            className={`${inputClass} font-mono`}
          />
        </Field>
        <Field label="Checklist (one per line)">
          <textarea name="checklist" rows={4} defaultValue={initialValues.checklist} className={inputClass} />
        </Field>
        <Field label="FAQs (format: Q: ... / A: ... blank line between entries)">
          <textarea name="faqsRaw" rows={6} defaultValue={initialValues.faqsRaw} className={inputClass} />
        </Field>
      </section>

      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border-soft bg-white p-5 md:grid-cols-2">
        <Field label="Author Name">
          <input name="authorName" required defaultValue={initialValues.authorName} className={inputClass} />
        </Field>
        <Field label="Author Role">
          <input name="authorRole" defaultValue={initialValues.authorRole} className={inputClass} />
        </Field>
        <Field label="Author Bio">
          <input name="authorBio" defaultValue={initialValues.authorBio} className={inputClass} />
        </Field>
        <Field label="Reviewer Name">
          <input name="reviewerName" defaultValue={initialValues.reviewerName} className={inputClass} />
        </Field>
        <Field label="Reviewer Role">
          <input name="reviewerRole" defaultValue={initialValues.reviewerRole} className={inputClass} />
        </Field>
      </section>

      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border-soft bg-white p-5 md:grid-cols-2">
        <Field label="Related Services (comma separated names)">
          <input name="relatedServices" defaultValue={initialValues.relatedServices} className={inputClass} />
        </Field>
        <Field label="Related Service Slugs (comma separated)">
          <input
            name="relatedServiceSlugs"
            defaultValue={initialValues.relatedServiceSlugs}
            className={inputClass}
          />
        </Field>
        <Field label="Related Posts (comma separated slugs)">
          <input name="relatedPosts" defaultValue={initialValues.relatedPosts} className={inputClass} />
        </Field>
      </section>

      <section className="grid grid-cols-1 gap-4 rounded-lg border border-border-soft bg-white p-5 md:grid-cols-2">
        <Field label="Meta Title">
          <input name="metaTitle" defaultValue={initialValues.metaTitle} className={inputClass} />
        </Field>
        <Field label="Meta Description">
          <input name="metaDescription" defaultValue={initialValues.metaDescription} className={inputClass} />
        </Field>
        <Field label="Schema Description">
          <input name="schemaDescription" defaultValue={initialValues.schemaDescription} className={inputClass} />
        </Field>
        <Field label="Canonical URL">
          <input name="canonicalUrl" defaultValue={initialValues.canonicalUrl} className={inputClass} />
        </Field>
        <Field label="OG Title">
          <input name="ogTitle" defaultValue={initialValues.ogTitle} className={inputClass} />
        </Field>
        <Field label="OG Description">
          <input name="ogDescription" defaultValue={initialValues.ogDescription} className={inputClass} />
        </Field>
        <Field label="OG Image URL">
          <input name="ogImage" defaultValue={initialValues.ogImage} className={inputClass} />
        </Field>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-deep disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
