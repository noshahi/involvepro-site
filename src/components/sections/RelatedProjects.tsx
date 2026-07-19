import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import type { Project } from "@/data/projects";

export function RelatedProjects({ related }: { related: Project[] }) {
  if (related.length === 0) return null;

  return (
    <section id="related-work" aria-label="Related projects" className="bg-white px-6 py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Related work</SectionEyebrow>
        <h2 className="mb-10 max-w-[520px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          More projects worth a look.
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {related.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]"
            >
              <div className="h-24 shrink-0" style={{ background: project.gradient }} />
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-text-muted">
                    {project.platform} · {project.industry}
                  </span>
                  <h3 className="mt-2 text-[15px] font-semibold text-canvas-dark">{project.title}</h3>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-green">
                  View Project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
