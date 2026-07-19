"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Globe2, LineChart, Cpu, Bot, LifeBuoy } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import { serviceGroups } from "@/data/services";

const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ecommerce: ShoppingCart,
  websites: Globe2,
  growth: LineChart,
  software: Cpu,
  "ai-automation": Bot,
  support: LifeBuoy,
};

const orbitPositions = [
  "top-0 left-6",
  "top-10 right-0",
  "top-[38%] left-0",
  "top-[42%] right-4",
  "bottom-8 left-10",
  "bottom-0 right-10",
];

export function ServicesHubHero() {
  return (
    <section aria-label="Services" className="relative overflow-hidden bg-canvas-dark px-6 pb-20 pt-36 sm:pb-24 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[340px] w-[340px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <Pill tone="green">Services</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[600px] font-sans text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.08] tracking-[-1.5px] text-white"
          >
            Services built around growth, systems, and technical execution.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[540px] text-[16.5px] leading-[1.65] text-white/60"
          >
            From Shopify and WordPress to SaaS products, AI automation, SEO, and full-stack
            platforms, involvepro helps businesses build the digital systems they need to
            operate, sell, rank, and scale.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <ScheduleMeetingButton variant="solid" />
            <MagneticButton href="#group-nav" variant="outline">
              Explore Service Groups
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto hidden h-[380px] w-full max-w-[460px] lg:block">
          {serviceGroups.map((group, i) => {
            const Icon = groupIcons[group.key];
            return (
              <motion.a
                key={group.key}
                href={`#${group.key}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className={`absolute ${orbitPositions[i]} animate-float flex w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-[#0c1712] px-4 py-3.5 shadow-xl transition-colors hover:border-brand-green/40`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-green">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[12.5px] font-semibold leading-tight text-white">{group.label}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2.5 lg:hidden">
          {serviceGroups.map((group) => {
            const Icon = groupIcons[group.key];
            return (
              <a
                key={group.key}
                href={`#${group.key}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c1712] px-3.5 py-2.5"
              >
                <Icon className="h-3.5 w-3.5 text-brand-green" />
                <span className="text-[12px] font-semibold text-white">{group.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
