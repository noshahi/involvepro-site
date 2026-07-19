import type { BlogPostAuthor } from "@/data/posts";

export function ArticleAuthorBox({ author }: { author: BlogPostAuthor }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border-soft bg-canvas-soft p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-[15px] font-semibold text-white">
        {author.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div>
        <p className="text-[14.5px] font-semibold text-canvas-dark">{author.name}</p>
        <p className="text-[12.5px] font-medium text-brand-green">{author.role}</p>
        <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-text-muted">{author.bio}</p>
      </div>
    </div>
  );
}
