"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { processSteps } from "@/lib/data/process";

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" aria-label="Our process" className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionEyebrow>How we work</SectionEyebrow>
            <h2 className="max-w-[420px] font-sans text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-canvas-dark">
              Strategy first. Clean build second. Continuous improvement after launch.
            </h2>
          </div>

          <div ref={ref} className="relative">
            {/* Desktop connected rail */}
            <div className="relative hidden lg:block">
              <div className="absolute left-0 right-0 top-6 h-px bg-border-soft" />
              <motion.div
                style={{ scaleX: lineScale }}
                className="absolute left-0 right-0 top-6 h-px origin-left bg-brand-green"
              />
              <div className="grid grid-cols-6 gap-4">
                {processSteps.map((step) => (
                  <div key={step.num} className="relative pt-14">
                    <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-border-soft bg-white font-mono text-[13px] font-semibold text-brand-green">
                      {step.num}
                    </span>
                    <h3 className="text-[15px] font-semibold text-canvas-dark">{step.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-muted">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile vertical stepper */}
            <div className="flex flex-col gap-8 lg:hidden">
              {processSteps.map((step, i) => (
                <div key={step.num} className="relative flex gap-5 pl-1">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-soft bg-white font-mono text-[12px] font-semibold text-brand-green">
                      {step.num}
                    </span>
                    {i < processSteps.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-[15.5px] font-semibold text-canvas-dark">{step.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
