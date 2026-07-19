import { ShieldCheck } from "lucide-react";
import type { BlogPostReviewer } from "@/data/posts";

export function ArticleReviewBlock({ reviewer }: { reviewer?: BlogPostReviewer }) {
  if (!reviewer) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-brand-green/25 bg-brand-green-soft px-5 py-4">
      <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-brand-green-deep" />
      <p className="text-[13px] leading-relaxed text-brand-green-deep">
        Reviewed for technical accuracy by the involvepro development and SEO team.
      </p>
    </div>
  );
}
