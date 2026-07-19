import { CheckCircle2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import type { Service } from "@/data/services";

export function ServiceDeliverables({ service }: { service: Service }) {
  return (
    <section aria-label="What's included" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionEyebrow>What&apos;s included</SectionEyebrow>
          <h2 className="max-w-[380px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            What you get, delivered.
          </h2>
          <p className="mt-5 max-w-[380px] text-[14px] leading-relaxed text-text-muted">
            Every engagement ends with concrete, usable deliverables — not just a list of tasks
            performed.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.deliverables.map((item) => (
            <RevealItem
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border-soft bg-canvas-soft p-5"
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
