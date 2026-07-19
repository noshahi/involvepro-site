"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/cn";

export function ProcessOverviewRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.5"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section aria-label="Process overview" className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 max-w-[640px]">
          <SectionEyebrow>How we work</SectionEyebrow>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-canvas-dark">
            Strategy first. Clean build second. Continuous improvement after launch.
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Desktop connected rail — alternating zigzag with scroll-linked fill */}
          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border-soft" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-1/2 top-0 bottom-0 w-px origin-top -translate-x-1/2 bg-brand-green"
            />
            <div className="flex flex-col gap-2">
              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={step.num} className="relative grid grid-cols-2 items-center gap-10 py-8">
                    <div className={cn(isLeft ? "pr-14 text-right" : "order-2 pl-14 text-left")}>
                      {isLeft && (
                        <div className="ml-auto max-w-[400px]">
                          <h3 className="text-[18px] font-semibold text-canvas-dark">{step.title}</h3>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{step.description}</p>
                        </div>
                      )}
                    </div>
                    <div className={cn(isLeft ? "order-2 pl-14" : "pr-14")}>
                      {!isLeft && (
                        <div className="max-w-[400px]">
                          <h3 className="text-[18px] font-semibold text-canvas-dark">{step.title}</h3>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{step.description}</p>
                        </div>
                      )}
                    </div>
                    <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-green/40 bg-white font-mono text-[13px] font-semibold text-brand-green shadow-[0_4px_16px_rgba(6,18,13,0.08)]">
                      {step.num}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="flex flex-col gap-8 lg:hidden">
            {processSteps.map((step, i) => (
              <div key={step.num} className="relative flex gap-5 pl-1">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-green/40 bg-white font-mono text-[12px] font-semibold text-brand-green">
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
    </section>
  );
}
