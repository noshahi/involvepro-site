import { CheckCircle2 } from "lucide-react";

export function ArticleKeyTakeaways({ takeaways }: { takeaways: string[] }) {
  if (takeaways.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border-soft bg-canvas-soft p-6 sm:p-7">
      <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
        Key takeaways
      </p>
      <ul className="flex flex-col gap-3">
        {takeaways.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-canvas-dark">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
