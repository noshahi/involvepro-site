"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { WorkFilterBar } from "@/components/sections/WorkFilterBar";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { getProjectsByTag, type FilterTag } from "@/data/projects";

export function WorkBentoGrid() {
  const [active, setActive] = useState<FilterTag>("All");
  const filtered = getProjectsByTag(active);

  return (
    <section id="all-work" aria-label="All projects" className="bg-canvas-soft px-6 py-24 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow>All projects</SectionEyebrow>
            <h2 className="max-w-[560px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              Browse work by platform, service, or industry.
            </h2>
          </div>
        </div>

        <div className="mb-10">
          <WorkFilterBar active={active} onChange={setActive} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-[14px] text-text-muted">No projects match this filter yet.</p>
        ) : (
          <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <RevealItem key={project.slug} className="h-full">
                <ProjectCard project={project} index={i} />
              </RevealItem>
            ))}
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
