"use client";

import { motion } from "framer-motion";
import { NotebookPen, Map, Palette, Code2, Search, Rocket } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

const panels = [
  { icon: NotebookPen, label: "Discovery notes", meta: "Goals · Audience · Constraints", offset: "lg:translate-y-2" },
  { icon: Map, label: "Sitemap", meta: "IA · User flows", offset: "lg:-translate-y-3" },
  { icon: Palette, label: "Figma design", meta: "UI · Content structure", offset: "lg:translate-y-4" },
  { icon: Code2, label: "Development", meta: "Shopify · WordPress · Next.js", offset: "lg:-translate-y-1" },
  { icon: Search, label: "SEO / AEO checklist", meta: "Metadata · Schema · Tracking", offset: "lg:translate-y-3" },
  { icon: Rocket, label: "QA & launch", meta: "Responsive · Forms · Redirects", offset: "lg:-translate-y-2" },
];

export function ProcessHero() {
  return (
    <section aria-label="Process" className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[340px] w-[340px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <Pill tone="green">Process</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[600px] font-sans text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] tracking-[-1.5px] text-white"
          >
            A structured process from requirement gathering to launch.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-white/60"
          >
            Every project starts with clarity. We define goals, scope, content, platform needs,
            technical requirements, SEO priorities, integrations, and launch expectations before
            development begins.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <ScheduleMeetingButton variant="solid" />
            <MagneticButton href="/services" variant="outline">
              Explore Services
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto grid w-full max-w-[460px] grid-cols-2 gap-3.5">
          {panels.map(({ icon: Icon, label, meta, offset }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-[#0c1712] p-4 shadow-xl ${offset}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-green">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[12.5px] font-semibold leading-tight text-white">{label}</p>
                <p className="mt-1 text-[10.5px] leading-snug text-white/40">{meta}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
