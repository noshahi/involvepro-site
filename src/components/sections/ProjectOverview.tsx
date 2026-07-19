import { SectionEyebrow } from "@/components/ui/GlassCard";
import type { Project } from "@/data/projects";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section aria-label="Overview" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionEyebrow>Overview</SectionEyebrow>
          <h2 className="max-w-[380px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            What this project was about.
          </h2>
        </div>
        <p className="max-w-[680px] text-[15.5px] leading-[1.75] text-text-muted">{project.overview}</p>
      </div>
    </section>
  );
}
