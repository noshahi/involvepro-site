"use client";

import { useEffect, useRef } from "react";
import { Globe, Database, Bot, UserCheck, LayoutDashboard, MessageCircle } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { aiCapabilities } from "@/lib/data/stats";

const nodes = [
  { label: "Website", icon: Globe },
  { label: "CRM", icon: Database },
  { label: "AI Assistant", icon: Bot },
  { label: "Human Review", icon: UserCheck },
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Customer Response", icon: MessageCircle },
];

export function AIWorkflowVisual() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !trackRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !trackRef.current) return;
      ctx = gsap.context(() => {
        gsap.to(".ai-pulse-dot", {
          offsetDistance: "100%",
          duration: 3.4,
          repeat: -1,
          ease: "power1.inOut",
          stagger: 0.9,
        });
      }, trackRef);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section aria-label="AI and automation" className="relative overflow-hidden bg-[#06131c] px-6 py-24 sm:py-28">
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-16 max-w-[640px]">
          <SectionEyebrow tone="light">AI + automation</SectionEyebrow>
          <h2 className="font-sans text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.12] tracking-[-1px] text-white">
            AI should improve operations, not create another disconnected tool.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            We design AI automations, assistants, chatbots, and data workflows around how your
            business actually works. The goal is less manual work, faster responses, cleaner
            reporting, and better operational control.
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div ref={trackRef} className="relative">
            <div
              className="hidden lg:flex items-center justify-between relative"
              style={{ minHeight: 140 }}
            >
              <svg className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="0.5"
                  x2="100%"
                  y2="0.5"
                  stroke="rgba(0,188,234,0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="5 6"
                />
              </svg>
              {nodes.map(({ label, icon: Icon }, i) => (
                <div key={label} className="relative z-10 flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-blue/30 bg-[#0a1a24]">
                    <Icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <span className="max-w-[80px] text-center text-[11px] font-medium leading-tight text-white/60">
                    {label}
                  </span>
                  {i < nodes.length - 1 && (
                    <span
                      className="ai-pulse-dot absolute left-1/2 top-7 h-1.5 w-1.5 rounded-full bg-brand-blue"
                      style={{
                        offsetPath: `path("M 0,0 L 190,0")`,
                        offsetRotate: "0deg",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: vertical node list */}
            <div className="flex flex-col gap-5 lg:hidden">
              {nodes.map(({ label, icon: Icon }, i) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-blue/30 bg-[#0a1a24]">
                    <Icon className="h-4 w-4 text-brand-blue" />
                  </div>
                  <span className="text-[13.5px] font-medium text-white/70">{label}</span>
                  {i < nodes.length - 1 && <span className="sr-only">→</span>}
                </div>
              ))}
            </div>
          </div>

          <RevealOnScroll stagger className="flex flex-col gap-3">
            {aiCapabilities.map((cap) => (
              <RevealItem
                key={cap}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13.5px] text-white/70"
              >
                {cap}
              </RevealItem>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
