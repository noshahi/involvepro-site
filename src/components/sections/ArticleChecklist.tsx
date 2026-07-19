import { ListChecks } from "lucide-react";

export function ArticleChecklist({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div id="checklist" className="scroll-mt-24 rounded-2xl border border-border-soft bg-canvas-dark p-7 sm:p-8">
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#8FE070]">
        <ListChecks className="h-4 w-4" /> Checklist
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item} className="flex items-start gap-3 rounded-lg bg-white/[0.04] p-3.5 text-[13.5px] leading-relaxed text-white/80">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-green/20 font-mono text-[10.5px] font-semibold text-brand-green">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
