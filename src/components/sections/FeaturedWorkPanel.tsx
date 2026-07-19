import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

const sizeClasses = {
  large: "md:col-span-4 md:row-span-2",
  medium: "md:col-span-2 md:row-span-2",
  small: "md:col-span-2",
} as const;

const bentoSizes = ["large", "medium", "medium", "small", "small", "small"] as const;

const bentoProjects = [...projects]
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .slice(0, 6)
  .map((project, i) => ({ project, size: bentoSizes[i] }));

export function FeaturedWorkPanel() {
  return (
    <section id="featured-work" aria-label="Featured work" className="bg-white px-6 py-24 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Featured work</SectionEyebrow>
        <h2 className="mb-14 max-w-[640px] font-sans text-[clamp(26px,3.2vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-canvas-dark">
          Selected builds with real technical depth.
        </h2>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[140px]">
          {bentoProjects.map(({ project, size }) => (
            <RevealItem key={project.slug} className={cn(sizeClasses[size], "h-full")}>
              <a
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]"
              >
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{ background: project.gradient, height: size === "large" ? "56%" : size === "medium" ? "50%" : "88px" }}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid-overlay-blue h-full w-full" />
                  </div>
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  </div>
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    {project.platform}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-brand-green-soft px-2.5 py-0.5 text-[10.5px] font-semibold text-brand-green-deep">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-[15px] font-semibold text-canvas-dark">{project.title}</h3>
                    <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.06em] text-text-muted">
                      {project.industry}
                    </p>
                    {size !== "small" && (
                      <p className="mt-2 text-[12.5px] leading-relaxed text-text-muted">{project.shortDescription}</p>
                    )}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-green">
                    View Case Study <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
