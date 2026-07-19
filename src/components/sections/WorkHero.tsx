"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Search, Bot } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";

const floatingCards = [
  {
    icon: ShoppingBag,
    label: "Shopify · Ecommerce",
    className: "left-2 top-4 lg:left-[-18px] lg:top-8",
    delay: 0,
  },
  {
    icon: Search,
    label: "SEO · Technical",
    className: "right-2 top-1/2 -translate-y-1/2 lg:right-[-24px]",
    delay: 0.5,
  },
  {
    icon: Bot,
    label: "AI Automation",
    className: "bottom-4 left-8 lg:bottom-[-14px] lg:left-10",
    delay: 1,
  },
];

export function WorkHero() {
  return (
    <section aria-label="Work" className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
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
            <Pill tone="green">Work</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[620px] font-sans text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] tracking-[-1.5px] text-white"
          >
            Work across ecommerce, B2B, SaaS, automation, and high-visibility brands.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-white/60"
          >
            Our project experience includes Shopify stores, WordPress websites, SEO
            implementation, UI/UX design, custom tools, maintenance support, SaaS systems, and
            digital operations for brands operating in competitive markets.
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-4 max-w-[540px] text-[13.5px] leading-relaxed text-white/40"
          >
            Selected work includes ecommerce brands, technical websites, service businesses, and
            companies with strong public visibility, including Shark Tank-related momentum.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <MagneticButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="solid">
              Schedule a Meeting <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#featured-work" variant="outline">
              View Selected Work
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserFrame label="involvepro.com/work">
            <div className="grid grid-cols-2 gap-3 p-4">
              <div className="col-span-2 h-24 rounded-lg" style={{ background: "linear-gradient(135deg, #082848, #50A932)" }} />
              <div className="h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #06120D, #00BCEA)" }} />
              <div className="h-16 rounded-lg" style={{ background: "linear-gradient(135deg, #2F7A21, #50A932)" }} />
            </div>
          </BrowserFrame>

          {floatingCards.map(({ icon: Icon, label, className, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + delay }}
              className={`animate-float absolute hidden items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-3.5 py-2.5 shadow-xl sm:flex ${className}`}
              style={{ animationDelay: `${delay}s` }}
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
