"use client";

import { useMemo, useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InsightsCategoryFilter } from "@/components/sections/InsightsCategoryFilter";
import { InsightCard } from "@/components/sections/InsightCard";
import { getAllCategories, type BlogPost } from "@/data/posts";

export function InsightsGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => getAllCategories(), []);

  const filtered = useMemo(
    () => (activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory)),
    [posts, activeCategory],
  );

  return (
    <section id="all-guides" aria-label="All guides" className="scroll-mt-24 bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <InsightsCategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {filtered.length > 0 ? (
          <RevealOnScroll stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <InsightCard key={post.slug} post={post} />
            ))}
          </RevealOnScroll>
        ) : (
          <p className="py-16 text-center text-[14px] text-text-muted">
            No guides in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
