"use client";

import { motion } from "framer-motion";
import { Gauge, ListChecks, Search, TrendingUp, Sparkles } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

const floatingCards = [
  { icon: Gauge, label: "Website Score Card", className: "left-2 top-2 lg:left-[-20px] lg:top-8" },
  { icon: Search, label: "SEO Visibility Panel", className: "right-2 top-1/3 lg:right-[-26px]" },
  { icon: TrendingUp, label: "Conversion Path Card", className: "bottom-24 left-6 lg:bottom-28 lg:left-[-12px]" },
  { icon: Sparkles, label: "Quick Wins", className: "bottom-2 right-8 lg:bottom-[-14px] lg:right-10" },
];

export function AuditHero() {
  return (
    <section aria-label="Free audit" className="relative overflow-hidden bg-canvas-dark px-6 pb-20 pt-36 sm:pb-24 sm:pt-40">
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-blue/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[340px] w-[340px] rounded-full bg-brand-green/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <Pill tone="blue">Free Audit</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[620px] font-sans text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] tracking-[-1.5px] text-white"
          >
            Free audit, real insight.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-white/60"
          >
            Fill in a few details and we&rsquo;ll review where your website, store, SEO
            visibility, conversion path, or automation workflow can improve. No sales pressure —
            just a clear view of where you stand and what to do next.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <MagneticButton href="#audit-form" variant="solid">
              Request Your Audit
            </MagneticButton>
            <ScheduleMeetingButton variant="outline" label="Schedule a Meeting" />
          </motion.div>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 text-[12.5px] font-medium text-white/40"
          >
            Free · No obligation · Practical next steps
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserFrame label="involvepro.com/free-audit">
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-3.5 w-3.5 shrink-0 text-brand-blue" />
                  <div className="h-2 w-24 rounded-full bg-white/15" />
                </div>
                <span className="font-mono text-[10px] font-semibold text-[#8FE070]">72/100</span>
              </div>
              <div className="h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #082848, #00BCEA)" }} />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-lg" style={{ background: "linear-gradient(135deg, #06120D, #50A932)" }} />
                <div className="h-14 rounded-lg" style={{ background: "linear-gradient(135deg, #2F7A21, #00BCEA)" }} />
              </div>
            </div>
          </BrowserFrame>

          {floatingCards.map(({ icon: Icon, label, className }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              className={`animate-float absolute hidden items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-3.5 py-2.5 shadow-xl sm:flex ${className}`}
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-blue">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11.5px] font-semibold leading-tight text-white">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
