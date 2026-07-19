import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import type { Project } from "@/data/projects";

export function ProjectGallery({ project }: { project: Project }) {
  const visuals = project.visuals ?? [];
  if (visuals.length === 0) return null;

  return (
    <section aria-label="Project gallery" className="bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Gallery</SectionEyebrow>
        <h2 className="mb-10 max-w-[420px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          A closer look.
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {visuals.map((visual) => (
            <figure key={visual.alt} className="overflow-hidden rounded-2xl">
              {visual.type === "browser-frame" ? (
                <BrowserFrame label={`${project.slug}.com`}>
                  <div className="h-56 w-full" style={{ background: project.gradient }} role="img" aria-label={visual.alt} />
                </BrowserFrame>
              ) : (
                <div
                  className="relative h-56 w-full overflow-hidden rounded-2xl border border-border-soft"
                  style={{ background: project.gradient }}
                  role="img"
                  aria-label={visual.alt}
                >
                  <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-25" />
                </div>
              )}
              <figcaption className="sr-only">{visual.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
