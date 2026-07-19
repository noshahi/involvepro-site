import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { toolGroups } from "@/lib/data/tools";

export function ToolStackGrid() {
  return (
    <section aria-label="Tools and stack" className="bg-canvas-navy px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[620px]">
          <SectionEyebrow tone="light">Our stack</SectionEyebrow>
          <h2 className="font-sans text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-white">
            We build with the tools your business already depends on.
          </h2>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {toolGroups.map((group) => (
            <RevealItem
              key={group.category}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-blue">
                {group.category}
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12.5px] font-medium text-white/75"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
