import { ArrowRight } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type CardVariant = "light" | "dark" | "browser" | "abstract";

function variantForIndex(i: number): CardVariant {
  const variants: CardVariant[] = ["light", "dark", "browser", "abstract"];
  return variants[i % variants.length];
}

function TagRow({ tags, tone }: { tags: string[]; tone: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold",
            tone === "light" ? "bg-brand-green-soft text-brand-green-deep" : "bg-white/10 text-[#8FE070]",
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const variant = variantForIndex(index);

  if (variant === "dark") {
    return (
      <a
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#0c1712] p-6 transition-all hover:-translate-y-1 hover:border-brand-blue/40"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] text-brand-blue">{"// "}{project.slug}</span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white/50">
              {project.platform}
            </span>
          </div>
          <h3 className="mt-4 text-[16px] font-semibold text-white">{project.title}</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">{project.shortDescription}</p>
          <div className="mt-4">
            <TagRow tags={project.tags} tone="dark" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-white/35">{project.industry}</span>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-blue">
            View Project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    );
  }

  if (variant === "browser") {
    return (
      <a
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]"
      >
        <BrowserFrame dark label={`${project.slug}.dev`} className="rounded-none border-0">
          <div className="h-24 w-full" style={{ background: project.gradient }} />
        </BrowserFrame>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-text-muted">
              {project.platform} · {project.industry}
            </span>
            <h3 className="mt-2 text-[15.5px] font-semibold text-canvas-dark">{project.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{project.shortDescription}</p>
            <div className="mt-4">
              <TagRow tags={project.tags} tone="light" />
            </div>
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green">
            View Project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    );
  }

  if (variant === "abstract") {
    return (
      <a
        href={`/work/${project.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-all hover:-translate-y-1"
        style={{ background: project.gradient }}
      >
        <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative">
          <span className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
            {project.projectType}
          </span>
          <h3 className="mt-4 text-[17px] font-semibold text-white">{project.title}</h3>
          <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-white/75">{project.shortDescription}</p>
        </div>
        <div className="relative mt-6 flex items-center justify-between">
          <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-white/60">{project.platform}</span>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
            View Project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]"
    >
      <div className="relative h-28 shrink-0" style={{ background: project.gradient }}>
        <div className="absolute left-4 top-4 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
        <span className="absolute bottom-3 right-4 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          {project.platform}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <TagRow tags={project.tags} tone="light" />
          <h3 className="mt-3 text-[15px] font-semibold text-canvas-dark">{project.title}</h3>
          <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.06em] text-text-muted">{project.industry}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-text-muted">{project.shortDescription}</p>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-green">
          View Project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
