import { AlertTriangle, Lightbulb } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectChallengeSolution({ project }: { project: Project }) {
  if (!project.challenge && !project.solution) return null;

  return (
    <section aria-label="Challenge and solution" className="bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-2">
        {project.challenge && (
          <div className="rounded-2xl border border-border-soft bg-white p-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-canvas-dark">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-[19px] font-semibold text-canvas-dark">The Challenge</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-muted">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div className="rounded-2xl border border-border-soft bg-white p-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-green-deep">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-[19px] font-semibold text-canvas-dark">The Solution</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-muted">{project.solution}</p>
          </div>
        )}
      </div>
    </section>
  );
}
