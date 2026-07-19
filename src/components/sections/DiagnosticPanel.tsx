import { AlertTriangle } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";

const problems = [
  { code: "ISSUE_01", title: "Page builders slow teams down", desc: "Every change routes through a bloated editor instead of clean, owned code." },
  { code: "ISSUE_02", title: "Stores leak conversions", desc: "Slow product pages and clunky checkouts quietly cost revenue every day." },
  { code: "ISSUE_03", title: "SEO gets handled too late", desc: "Structure and schema get bolted on after launch instead of built in." },
  { code: "ISSUE_04", title: "Operations depend on manual work", desc: "Teams re-key data between tools that should already talk to each other." },
  { code: "ISSUE_05", title: "SaaS ideas stall before launch", desc: "No clear architecture means months lost before a real product exists." },
  { code: "ISSUE_06", title: "AI gets added without a real workflow", desc: "A chatbot bolted onto a broken process just automates the wrong thing faster." },
];

export function DiagnosticPanel() {
  return (
    <section aria-label="Problem" className="relative overflow-hidden bg-[#0e1a12] px-6 py-24 sm:py-28">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionEyebrow tone="light">Why businesses call us</SectionEyebrow>
          <h2 className="max-w-[420px] font-sans text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-1px] text-white">
            Most websites are not built to scale.
          </h2>
          <p className="mt-6 max-w-[400px] text-[15.5px] leading-relaxed text-white/50">
            Symptoms show up as slow pages, stalled SEO, and manual work that never stops. The
            root cause is almost always the same — no real technical foundation.
          </p>
        </div>

        <RevealOnScroll stagger className="flex flex-col divide-y divide-white/10 border-t border-white/10">
          {problems.map((p) => (
            <RevealItem key={p.code} className="group flex items-start gap-5 py-6">
              <span className="mt-0.5 font-mono text-[11px] text-brand-green/70">{p.code}</span>
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-brand-green" />
              <div>
                <h3 className="text-[16px] font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-white/45">{p.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
