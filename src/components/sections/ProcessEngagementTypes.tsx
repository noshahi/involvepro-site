import { Rocket, TrendingUp, ShieldCheck, Workflow, ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { engagementTypes } from "@/data/process";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "project-build": Rocket,
  "optimization-sprint": TrendingUp,
  "ongoing-support": ShieldCheck,
  "automation-build": Workflow,
};

const accents = [
  "bg-gradient-to-br from-brand-green to-brand-green-deep",
  "bg-gradient-to-br from-brand-blue to-brand-navy",
  "bg-gradient-to-br from-brand-navy to-canvas-dark",
  "bg-gradient-to-br from-brand-green-deep to-canvas-dark",
];

export function ProcessEngagementTypes() {
  return (
    <section aria-label="Engagement types" className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[640px]">
          <SectionEyebrow>Engagement types</SectionEyebrow>
          <h2 className="font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            Built for focused projects and long-term technical ownership.
          </h2>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engagementTypes.map((type, i) => {
            const Icon = icons[type.key];
            return (
              <RevealItem key={type.key} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-border-soft bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]">
                  <div>
                    <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${accents[i % accents.length]}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-canvas-dark">{type.title}</h3>
                    <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-text-muted">
                      Best for
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{type.bestFor}</p>
                    <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-text-muted">
                      Typical focus
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{type.typicalFocus}</p>
                  </div>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green"
                  >
                    {type.ctaLabel} <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
