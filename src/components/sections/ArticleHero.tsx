import { CalendarClock, Clock, ShieldCheck } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import type { BlogPost } from "@/data/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <section aria-label="Article" className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[340px] w-[340px] rounded-full bg-brand-green/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[820px]">
        <Pill tone="green">{post.category}</Pill>
        <h1 className="mt-6 font-sans text-[clamp(28px,4vw,44px)] font-bold leading-[1.14] tracking-[-1.2px] text-white">
          {post.title}
        </h1>
        <p className="mt-5 max-w-[620px] text-[16px] leading-[1.65] text-white/60">{post.excerpt}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-white/50">
          <span className="font-medium text-white/80">{post.author.name}</span>
          <span className="flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" /> Published {formatDate(post.publishedDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" /> Updated {formatDate(post.updatedDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime}
          </span>
          {post.reviewer && (
            <span className="flex items-center gap-1.5 text-[#8FE070]">
              <ShieldCheck className="h-3.5 w-3.5" /> Reviewed by {post.reviewer.name}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
