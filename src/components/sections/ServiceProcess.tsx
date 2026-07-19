import { SectionEyebrow } from "@/components/ui/GlassCard";
import type { Service } from "@/data/services";

export function ServiceProcess({ service }: { service: Service }) {
  return (
    <section id="process" aria-label="Our process" className="bg-canvas-soft px-6 py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 max-w-[560px]">
          <SectionEyebrow>How we work</SectionEyebrow>
          <h2 className="font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            A clear technical process, every time.
          </h2>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-border-soft" />
          <div className="grid grid-cols-6 gap-4">
            {service.process.map((step) => (
              <div key={step.num} className="relative pt-14">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-border-soft bg-white font-mono text-[13px] font-semibold text-brand-green">
                  {step.num}
                </span>
                <h3 className="text-[14px] font-semibold text-canvas-dark">{step.title}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:hidden">
          {service.process.map((step, i) => (
            <div key={step.num} className="relative flex gap-5 pl-1">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-soft bg-white font-mono text-[12px] font-semibold text-brand-green">
                  {step.num}
                </span>
                {i < service.process.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
              </div>
              <div className="pb-2">
                <h3 className="text-[15px] font-semibold text-canvas-dark">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
