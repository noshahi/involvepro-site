import { SectionEyebrow } from "@/components/ui/GlassCard";
import { InsightCard } from "@/components/sections/InsightCard";
import type { BlogPost } from "@/data/posts";

export function ArticleRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-label="Related posts" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Related reading</SectionEyebrow>
        <h2 className="mb-10 max-w-[520px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          More guides worth a look.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <InsightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
