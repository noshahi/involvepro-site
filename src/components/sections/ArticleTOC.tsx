"use client";

import type { BlogPostSection } from "@/data/posts";

type ArticleTOCProps = {
  sections: BlogPostSection[];
  variant: "desktop" | "mobile";
};

export function ArticleTOC({ sections, variant }: ArticleTOCProps) {
  if (sections.length === 0) return null;

  if (variant === "desktop") {
    return (
      <nav
        aria-label="Table of contents"
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border-soft bg-white p-5 lg:block"
      >
        <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
          On this page
        </p>
        <ul className="flex flex-col gap-2.5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block text-[13px] leading-snug text-text-muted transition-colors hover:text-brand-green"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <details className="mb-8 rounded-2xl border border-border-soft bg-white p-5 lg:hidden">
      <summary className="cursor-pointer font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
        On this page
      </summary>
      <ul className="mt-4 flex flex-col gap-2.5">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="block text-[13.5px] leading-snug text-canvas-dark">
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
