"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import type { Project } from "@/data/projects";

export function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <section aria-label={project.title} className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <Pill tone="green">{project.projectType}</Pill>
            <Pill tone="light">{project.platform}</Pill>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[640px] font-sans text-[clamp(28px,4.2vw,46px)] font-bold leading-[1.12] tracking-[-1px] text-white"
          >
            {project.title}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-white/60"
          >
            {project.shortDescription}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35">Client</p>
              <p className="mt-1 text-[13.5px] font-semibold text-white">{project.clientName}</p>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35">Industry</p>
              <p className="mt-1 text-[13.5px] font-semibold text-white">{project.industry}</p>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35">Services</p>
              <p className="mt-1 text-[13.5px] font-semibold text-white">{project.services.join(", ")}</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <ScheduleMeetingButton variant="solid" />
            {project.websiteUrl && (
              <MagneticButton href={project.websiteUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                Visit Website <ExternalLink className="h-3.5 w-3.5" />
              </MagneticButton>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserFrame label={`${project.slug}.com`}>
            <div className="p-4">
              <div className="h-56 w-full rounded-lg" style={{ background: project.gradient }} />
            </div>
          </BrowserFrame>
        </motion.div>
      </div>
    </section>
  );
}
