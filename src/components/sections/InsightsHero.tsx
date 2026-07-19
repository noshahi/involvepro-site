"use client";

import { motion } from "framer-motion";
import { FileSearch, ListChecks, Bot, ShoppingBag, HelpCircle } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

const floatingCards = [
  { icon: ShoppingBag, label: "Shopify · Redesign Notes", className: "left-2 top-2 lg:left-[-20px] lg:top-6" },
  { icon: ListChecks, label: "SEO Checklist", className: "right-2 top-1/3 lg:right-[-26px]" },
  { icon: Bot, label: "AI Workflow Note", className: "bottom-24 left-6 lg:bottom-28 lg:left-[-10px]" },
  { icon: HelpCircle, label: "Schema / FAQ Panel", className: "bottom-2 right-8 lg:bottom-[-14px] lg:right-10" },
];

export function InsightsHero() {
  return (
    <section aria-label="Insights" className="relative overflow-hidden bg-canvas-dark px-6 pb-20 pt-36 sm:pb-24 sm:pt-40">
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
            <Pill tone="green">Insights</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[620px] font-sans text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] tracking-[-1.5px] text-white"
          >
            Practical guides for Shopify, SEO, SaaS, AI, and web development.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-white/60"
          >
            Clear technical guidance for businesses planning website redesigns, ecommerce
            improvements, SEO fixes, AI automations, SaaS products, and ongoing website
            maintenance.
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

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserFrame label="involvepro.com/insights">
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">
                <FileSearch className="h-3.5 w-3.5 shrink-0 text-brand-green" />
                <div className="h-2 w-3/4 rounded-full bg-white/15" />
              </div>
              <div className="h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #082848, #50A932)" }} />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-lg" style={{ background: "linear-gradient(135deg, #06120D, #00BCEA)" }} />
                <div className="h-14 rounded-lg" style={{ background: "linear-gradient(135deg, #2F7A21, #50A932)" }} />
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
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-green">
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
