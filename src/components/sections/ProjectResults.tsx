import { CheckCircle2, TrendingUp } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import type { Project } from "@/data/projects";

export function ProjectResults({ project }: { project: Project }) {
  return (
    <>
      <section aria-label="Deliverables" className="bg-canvas-soft px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionEyebrow>Deliverables</SectionEyebrow>
          <h2 className="mb-10 max-w-[420px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            What was delivered.
          </h2>
          <RevealOnScroll stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.deliverables.map((item) => (
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

      {project.results && project.results.length > 0 && (
        <section aria-label="Results and outcomes" className="bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>Outcomes</SectionEyebrow>
            <h2 className="mb-10 max-w-[420px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              What changed.
            </h2>
            <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {project.results.map((result) => (
                <RevealItem
                  key={result.metric}
                  className="flex h-full flex-col rounded-2xl border border-border-soft bg-canvas-soft p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-green to-brand-green-deep">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-canvas-dark">{result.metric}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{result.description}</p>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}
    </>
  );
}
