import { CheckCircle2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { qaChecklist } from "@/data/process";

export function ProcessQualityAssurance() {
  return (
    <section aria-label="QA and launch" className="bg-canvas-soft px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionEyebrow>QA & launch</SectionEyebrow>
          <h2 className="max-w-[380px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            Launch only when the important paths are tested.
          </h2>
          <p className="mt-5 max-w-[380px] text-[14px] leading-relaxed text-text-muted">
            QA is not treated as a quick final click-through. It is part of the delivery process,
            reviewed against a shared checklist before anything goes live.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {qaChecklist.map((item) => (
            <RevealItem
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border-soft bg-white p-5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span className="text-[14px] leading-relaxed text-canvas-dark">{item}</span>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
