import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { RevealItem } from "@/components/ui/RevealOnScroll";
import type { BlogPost } from "@/data/posts";

export function InsightCard({ post }: { post: BlogPost }) {
  return (
    <RevealItem>
      <Link
        href={`/insights/${post.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-border-soft bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]"
      >
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-brand-green">
          {post.category}
        </span>
        <h3 className="mt-3 text-[16.5px] font-semibold leading-snug text-canvas-dark">{post.title}</h3>
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
  );
}
