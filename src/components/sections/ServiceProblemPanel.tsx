import { AlertTriangle, Users } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import type { Service } from "@/data/services";

export function ServiceProblemPanel({ service }: { service: Service }) {
  return (
    <section aria-label="The problem" className="relative overflow-hidden bg-[#0e1a12] px-6 py-20 sm:py-24">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-brand-green" />
            <SectionEyebrow tone="light" className="mb-0">The problem</SectionEyebrow>
          </div>
          <h2 className="max-w-[420px] font-sans text-[clamp(24px,3vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-white">
            {service.problemTitle}
          </h2>
          <p className="mt-6 max-w-[420px] text-[14.5px] leading-relaxed text-white/50">
            {service.problemDescription}
          </p>

          <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-6">
            <Users className="h-4 w-4 text-brand-blue" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Best for</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.bestFor.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-white/70">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">What we do</p>
          <RevealOnScroll stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.whatWeDo.map((item) => (
              <RevealItem
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[13.5px] leading-snug text-white/75"
              >
                {item}
              </RevealItem>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
