"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight, TrendingUp, Sparkles, LayoutDashboard, Gauge } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { heroProofItems } from "@/lib/data/stats";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";

const codeLines = [
  { text: 'section "product-grid" {', color: "text-white/70" },
  { text: "  collection: best_sellers", color: "text-brand-blue" },
  { text: "  columns: 4", color: "text-brand-blue" },
  { text: "  seo: schema, alt_text, sitemap", color: "text-brand-blue" },
  { text: "  speed: lazy_load, cwv_optimized", color: "text-brand-blue" },
  { text: "}", color: "text-white/70" },
  { text: "// deployed & monitored by involvepro", color: "text-white/30" },
];

export function SplitHero() {
  return (
    <section id="home" aria-label="Hero" className="relative overflow-hidden bg-canvas-dark pb-20 pt-32 sm:pb-28 sm:pt-36">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* Left: copy */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <Pill tone="green" icon={<BadgeCheck className="h-3.5 w-3.5" />}>
              Shopify Select Partner
            </Pill>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[600px] font-sans text-[clamp(34px,4.8vw,58px)] font-bold leading-[1.06] tracking-[-1.5px] text-white"
          >
            Technical websites, ecommerce systems, and AI-powered tools built for growth.
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[520px] text-[17px] leading-[1.65] text-white/60"
          >
            involvepro helps USA-focused businesses design, build, optimize, and maintain Shopify
            stores, WordPress websites, SaaS products, AI automations, SEO systems, and custom web
            platforms.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <MagneticButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="solid">
              Schedule a Meeting <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#services" variant="outline">
              Explore Services
            </MagneticButton>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="mt-4 text-[12.5px] text-white/35"
          >
            Free 30-minute call · No obligation
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7"
          >
            {heroProofItems.map((item) => (
              <span key={item} className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-white/45">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: layered technical visual */}
        <div className="relative mx-auto hidden w-full max-w-[480px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="animate-float"
          >
            <BrowserFrame label="theme.liquid">
              <pre className="overflow-auto px-5 py-6 font-mono text-[12.5px] leading-[1.75]">
                {codeLines.map((line, i) => (
                  <div key={i} className={line.color}>
                    {line.text}
                  </div>
                ))}
              </pre>
            </BrowserFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute -top-8 -right-6 flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3 shadow-xl"
          >
            <TrendingUp className="h-4 w-4 text-brand-green" />
            <div>
              <div className="text-[12px] font-semibold text-white">SEO Score 96</div>
              <div className="font-mono text-[10px] text-white/40">Passing Core Web Vitals</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -left-10 top-1/3 flex items-center gap-2 rounded-xl border border-brand-blue/30 bg-[#0a1a24] px-3.5 py-2.5 shadow-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-mono text-[11px] text-brand-blue">AI workflow: routed</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="absolute -bottom-10 -left-6 flex w-[190px] items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3.5 shadow-xl"
          >
            <LayoutDashboard className="h-4 w-4 text-white/60" />
            <div>
              <div className="text-[12px] font-semibold text-white">SaaS Dashboard</div>
              <div className="font-mono text-[10px] text-white/40">MRR +18% MoM</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -bottom-4 right-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white px-3.5 py-2.5 shadow-xl"
          >
            <Gauge className="h-3.5 w-3.5 text-brand-green" />
            <span className="text-[12px] font-semibold text-canvas-dark">Core Web Vitals: Passing</span>
          </motion.div>
        </div>

        {/* Mobile fallback: simplified stacked visual */}
        <div className="lg:hidden">
          <BrowserFrame label="theme.liquid">
            <pre className="overflow-auto px-5 py-6 font-mono text-[12px] leading-[1.75]">
              {codeLines.map((line, i) => (
                <div key={i} className={line.color}>
                  {line.text}
                </div>
              ))}
            </pre>
          </BrowserFrame>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3">
              <TrendingUp className="h-4 w-4 text-brand-green" />
              <span className="text-[12px] font-semibold text-white">SEO Score 96</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-brand-blue/30 bg-[#0a1a24] px-3.5 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              <span className="font-mono text-[11px] text-brand-blue">AI workflow: routed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
