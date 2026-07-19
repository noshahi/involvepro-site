import { Sparkles } from "lucide-react";

export function ArticleDirectAnswer({ answer }: { answer: string }) {
  return (
    <div className="rounded-2xl border border-brand-green/25 bg-brand-green-soft p-6 sm:p-7">
      <div className="mb-2.5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-green-deep">
        <Sparkles className="h-3.5 w-3.5" /> Direct answer
      </div>
      <p className="text-[15.5px] leading-relaxed text-canvas-dark">{answer}</p>
    </div>
  );
}
