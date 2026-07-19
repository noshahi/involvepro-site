import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { auditProcessSteps } from "@/data/audit";

export function AuditProcess() {
  return (
    <section aria-label="Audit process" className="relative overflow-hidden bg-canvas-dark px-6 py-20 sm:py-24">
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-[1280px]">
        <SectionEyebrow tone="light">Process</SectionEyebrow>
        <h2 className="mb-12 max-w-[560px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-white">
          What happens after you request the audit?
        </h2>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {auditProcessSteps.map((step, i) => (
            <RevealItem key={step} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="font-mono text-[13px] font-semibold text-[#8FE070]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[13.5px] leading-relaxed text-white/70">{step}</p>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
