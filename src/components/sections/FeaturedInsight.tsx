import { ArrowRight, Clock, CalendarClock } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { BlogPost } from "@/data/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function FeaturedInsight({ post }: { post: BlogPost }) {
  return (
    <section aria-label="Featured guide" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Featured guide</SectionEyebrow>
        <RevealOnScroll>
          <Link
            href={`/insights/${post.slug}`}
            className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-border-soft bg-canvas-soft transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(6,18,13,0.1)] lg:grid-cols-[1fr_1fr]"
          >
            <div
              className="relative flex min-h-[220px] flex-col justify-between overflow-hidden p-8 sm:p-10 lg:min-h-[380px]"
              style={{ background: "linear-gradient(135deg, #082848, #06120D 60%, #2F7A21)" }}
            >
              <div className="grid-overlay pointer-events-none absolute inset-0 opacity-15" />
              <div className="relative">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FE070]">
                  {post.category}
                </span>
                <h3 className="mt-4 max-w-[420px] text-[clamp(20px,2.4vw,28px)] font-bold leading-[1.2] tracking-[-0.5px] text-white">
                  {post.title}
                </h3>
              </div>
              <div className="relative flex items-center gap-4 text-[12.5px] text-white/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" /> Updated {formatDate(post.updatedDate)}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-[15px] leading-relaxed text-text-muted">{post.excerpt}</p>

              <div className="mt-6 rounded-xl border border-border-soft bg-white p-5">
                <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Key takeaway
                </p>
                <p className="text-[13.5px] leading-relaxed text-canvas-dark">{post.keyTakeaways[0]}</p>
              </div>

              <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-brand-green">
                Read Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
