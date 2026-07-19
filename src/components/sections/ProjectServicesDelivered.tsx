import {
  ShoppingBag, Palette, TrendingUp, Globe, Puzzle, Building2, Layers3, LayoutTemplate,
  Search, Radar, BarChart3, Split, Mail, MousePointerClick, Wrench, Code2, Layers,
  Rocket, Workflow, Bot, Zap, ShieldCheck, ArrowRight,
} from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { getServiceBySlug } from "@/data/services";
import type { Project } from "@/data/projects";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "shopping-bag": ShoppingBag,
  palette: Palette,
  "trending-up": TrendingUp,
  globe: Globe,
  puzzle: Puzzle,
  "building-2": Building2,
  "layers-3": Layers3,
  "layout-template": LayoutTemplate,
  search: Search,
  radar: Radar,
  "bar-chart-3": BarChart3,
  split: Split,
  mail: Mail,
  "mouse-pointer-click": MousePointerClick,
  wrench: Wrench,
  "code-2": Code2,
  layers: Layers,
  rocket: Rocket,
  workflow: Workflow,
  bot: Bot,
  zap: Zap,
  "shield-check": ShieldCheck,
};

const accentClasses = {
  green: "bg-gradient-to-br from-brand-green to-brand-green-deep",
  blue: "bg-gradient-to-br from-brand-blue to-brand-navy",
  navy: "bg-gradient-to-br from-brand-navy to-canvas-dark",
};

export function ProjectServicesDelivered({ project }: { project: Project }) {
  const services = project.serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (services.length === 0) return null;

  return (
    <section aria-label="Services delivered" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Services delivered</SectionEyebrow>
        <h2 className="mb-10 max-w-[520px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          The services behind this project.
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-border-soft bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]"
              >
                <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-lg ${accentClasses[s.accent]}`}>
                  {Icon && <Icon className="h-4 w-4 text-white" />}
                </div>
                <h3 className="text-[15px] font-semibold text-canvas-dark">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{s.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-green">
                  Explore Service <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
