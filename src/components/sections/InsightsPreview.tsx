import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { posts } from "@/data/posts";

export function InsightsPreview() {
  const preview = posts.slice(0, 3);

  return (
    <section id="insights" aria-label="Insights" className="bg-canvas-soft px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <SectionEyebrow>Insights</SectionEyebrow>
            <h2 className="font-sans text-[clamp(28px,3.2vw,38px)] font-bold leading-[1.14] tracking-[-1px] text-canvas-dark">
              Practical guides for Shopify, SEO, SaaS, AI, and web development.
            </h2>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-green hover:text-brand-green-deep"
          >
            View all guides <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {preview.map((post) => (
            <RevealItem key={post.slug}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border-soft bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]"
              >
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-brand-green">
                  {post.category}
                </span>
                <h3 className="mt-3 text-[16.5px] font-semibold leading-snug text-canvas-dark">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-text-muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border-soft pt-4">
                  <span className="flex items-center gap-1.5 text-[12px] text-text-muted">
                    <Clock className="h-3.5 w-3.5" /> {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1 text-[12.5px] font-semibold text-brand-green">
                    Read <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
