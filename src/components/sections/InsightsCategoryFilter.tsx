"use client";

import { cn } from "@/lib/cn";

type InsightsCategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export function InsightsCategoryFilter({ categories, activeCategory, onSelect }: InsightsCategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter guides by category"
      className="mb-10 flex flex-wrap gap-2 overflow-x-auto"
    >
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={activeCategory === category}
          onClick={() => onSelect(category)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
            activeCategory === category
              ? "border-brand-green bg-brand-green text-white"
              : "border-border-soft bg-white text-text-muted hover:border-brand-green/40 hover:text-canvas-dark",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
