"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, TrendingUp, Search, Bot, CheckCircle2 } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Service } from "@/data/services";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";

function HeroVisual({ service }: { service: Service }) {
  switch (service.heroVisualType) {
    case "commerce":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3.5">
            <ShoppingBag className="h-4 w-4 text-brand-green" />
            <span className="text-[12.5px] font-semibold text-white">Product page — conversion ready</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3.5">
            <TrendingUp className="h-4 w-4 text-brand-green" />
            <span className="text-[12.5px] font-semibold text-white">AOV +18% since launch</span>
          </div>
        </div>
      );
    case "analytics":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3.5">
            <Search className="h-4 w-4 text-brand-green" />
            <span className="text-[12.5px] font-semibold text-white">SEO Score 96</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3.5 font-mono text-[11px] text-white/50">
            organic_traffic: <span className="text-brand-blue">+42%</span> qoq
          </div>
        </div>
      );
    case "flow":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-brand-blue/30 bg-[#0a1a24] px-4 py-3.5">
            <Bot className="h-4 w-4 text-brand-blue" />
            <span className="text-[12.5px] font-semibold text-white">AI workflow: routed</span>
          </div>
          <div className="rounded-xl border border-brand-blue/30 bg-[#0a1a24] px-4 py-3.5 font-mono text-[11px] text-white/50">
            lead → qualify → route → notify
          </div>
        </div>
      );
    case "checklist":
      return (
        <div className="flex flex-col gap-2.5">
          {service.deliverables.slice(0, 3).map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-green" />
              <span className="text-[12px] text-white/80">{item}</span>
            </div>
          ))}
        </div>
      );
    case "browser":
    case "code":
    default:
      return (
        <pre className="overflow-auto px-5 py-6 font-mono text-[12px] leading-[1.75]">
          <span className="text-white/70">{"<Service"} name=&quot;{service.title}&quot; {">"}</span>
          {"\n"}
          <span className="pl-3 text-brand-blue">status: shipped</span>
          {"\n"}
          <span className="pl-3 text-brand-blue">stack: custom-coded</span>
          {"\n"}
          <span className="text-white/70">{"</Service>"}</span>
        </pre>
      );
  }
}

export function ServiceDetailHero({ service }: { service: Service }) {
  return (
    <section aria-label={service.title} className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <Pill tone="green">{service.eyebrow}</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[640px] font-sans text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.12] tracking-[-1px] text-white"
          >
            {service.headline}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-white/60"
          >
            {service.shortDescription}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <MagneticButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="solid">
              {service.primaryCTA} <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={service.secondaryCTA === "View Process" ? "#process" : "#related"} variant="outline">
              {service.secondaryCTA}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.heroVisualType === "browser" || service.heroVisualType === "code" ? (
            <BrowserFrame label={`${service.slug}.ts`}>
              <HeroVisual service={service} />
            </BrowserFrame>
          ) : (
            <HeroVisual service={service} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
