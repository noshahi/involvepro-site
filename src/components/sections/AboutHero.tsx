"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Layers, MapPin, Users } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

const trustStrip = [
  { icon: Layers, label: "400+ completed projects" },
  { icon: ShieldCheck, label: "Shopify Partner agency" },
  { icon: MapPin, label: "Clients across markets" },
  { icon: Users, label: "Development + SEO team" },
];

export function AboutHero() {
  return (
    <section aria-label="About involvepro" className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[340px] w-[340px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[840px] text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="flex justify-center"
          >
            <Pill tone="green">About involvepro</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mx-auto mt-6 max-w-[720px] font-sans text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.1] tracking-[-1.5px] text-white"
          >
            A technical agency built for businesses that need more than a good-looking website.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mx-auto mt-6 max-w-[620px] text-[16px] leading-[1.65] text-white/60"
          >
            involvepro helps growth-focused brands build, improve, and maintain Shopify stores,
            WordPress websites, SaaS products, SEO systems, AI automations, and custom web platforms.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap justify-center gap-3.5"
          >
            <ScheduleMeetingButton variant="solid" />
            <MagneticButton href="/free-audit" variant="outline">
              Request a Free Audit
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 grid max-w-[720px] grid-cols-2 gap-3.5 sm:grid-cols-4"
        >
          {trustStrip.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0c1712] p-4 text-center shadow-xl"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-green">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-[12.5px] font-semibold leading-tight text-white">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
