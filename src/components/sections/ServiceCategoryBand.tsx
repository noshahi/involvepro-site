import {
  ShoppingBag, Palette, TrendingUp, Globe, Puzzle, Building2, Layers3, LayoutTemplate,
  Search, Radar, BarChart3, Split, Mail, MousePointerClick, Wrench, Code2, Layers,
  Rocket, Workflow, Bot, Zap, ShieldCheck, ArrowRight, CheckCircle2,
} from "lucide-react";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import type { Service, ServiceGroup } from "@/data/services";
import { cn } from "@/lib/cn";

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

function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = icons[slug];
  if (!Icon) return null;
  return <Icon className={className} />;
}

const bandBg: Record<ServiceGroup["layout"], string> = {
  bento: "bg-canvas-soft",
  split: "bg-white",
  analytics: "bg-brand-green-soft",
  "dark-technical": "bg-canvas-dark",
  "node-flow": "bg-[#06131c]",
  checklist: "bg-white",
};

const isDark = (layout: ServiceGroup["layout"]) => layout === "dark-technical" || layout === "node-flow";

export function ServiceCategoryBand({ group, services }: { group: ServiceGroup; services: Service[] }) {
  const dark = isDark(group.layout);

  return (
    <section
      id={group.key}
      aria-label={group.label}
      className={cn("relative overflow-hidden px-6 py-20 sm:py-24 scroll-mt-24", bandBg[group.layout])}
    >
      {dark && <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-30" />}

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className={cn("font-mono text-[11px] font-medium uppercase tracking-[0.18em]", dark ? "text-[#8FE070]" : "text-brand-green-deep")}>
              {group.label}
            </span>
            <h2 className={cn("mt-3 max-w-[520px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px]", dark ? "text-white" : "text-canvas-dark")}>
              {group.description}
            </h2>
          </div>
        </div>

        {group.layout === "bento" && (
          <RevealOnScroll stagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <a
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border-soft bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]"
                >
                  <div className={cn("h-2.5 w-full", accentClasses[s.accent])} />
                  <div className="flex flex-1 flex-col justify-between p-7">
                    <div>
                      <div className={cn("mb-5 flex h-11 w-11 items-center justify-center rounded-xl", accentClasses[s.accent])}>
                        <ServiceIcon slug={s.icon} className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-[17px] font-semibold text-canvas-dark">{s.title}</h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">{s.shortDescription}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green">
                      Explore Service <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealOnScroll>
        )}

        {group.layout === "split" && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group overflow-hidden rounded-2xl border border-border-soft transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]"
              >
                <BrowserFrame dark label={`${s.slug}.dev`} className="rounded-none border-0">
                  <div className="flex flex-col gap-2 px-5 py-6 font-mono text-[11.5px] leading-relaxed text-white/50">
                    <span className="text-brand-blue">{"<Section"} name=&quot;{s.title.split(" ")[0].toLowerCase()}&quot; {">"}</span>
                    <span className="pl-3 text-white/70">layout: responsive</span>
                    <span className="pl-3 text-white/70">seo: schema, sitemap</span>
                    <span>{"</Section>"}</span>
                  </div>
                </BrowserFrame>
                <div className="bg-white p-6">
                  <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-lg", accentClasses[s.accent])}>
                    <ServiceIcon slug={s.icon} className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-canvas-dark">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green">
                    Explore Service <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {group.layout === "analytics" && (
          <RevealOnScroll stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <a
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border-soft bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", accentClasses[s.accent])}>
                      <ServiceIcon slug={s.icon} className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">{s.eyebrow}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-canvas-dark">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-text-muted">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealOnScroll>
        )}

        {group.layout === "dark-technical" && (
          <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <a
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-brand-blue/40"
                >
                  <div>
                    <span className="font-mono text-[11px] text-brand-blue">{"// "}{s.slug}</span>
                    <div className={cn("my-4 flex h-10 w-10 items-center justify-center rounded-lg", accentClasses[s.accent])}>
                      <ServiceIcon slug={s.icon} className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-[15.5px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">{s.shortDescription}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-blue">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealOnScroll>
        )}

        {group.layout === "node-flow" && (
          <div className="relative">
            <div className="hidden items-center justify-between gap-4 md:flex">
              {services.map((s, i) => (
                <div key={s.slug} className="flex flex-1 items-center">
                  <a
                    href={`/services/${s.slug}`}
                    className="group flex flex-1 flex-col rounded-2xl border border-brand-blue/20 bg-[#0a1a24] p-6 transition-all hover:-translate-y-1 hover:border-brand-blue/50"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/30 bg-[#0d222f]">
                      <ServiceIcon slug={s.icon} className="h-5 w-5 text-brand-blue" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">{s.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-blue">
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                  {i < services.length - 1 && (
                    <span className="mx-3 h-px w-8 shrink-0 bg-gradient-to-r from-brand-blue/40 to-brand-blue/10" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 md:hidden">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex flex-col rounded-2xl border border-brand-blue/20 bg-[#0a1a24] p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/30 bg-[#0d222f]">
                    <ServiceIcon slug={s.icon} className="h-5 w-5 text-brand-blue" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/45">{s.shortDescription}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {group.layout === "checklist" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            {services.map((s) => (
              <div key={s.slug} className="contents">
                <div>
                  <div className={cn("mb-5 flex h-11 w-11 items-center justify-center rounded-xl", accentClasses[s.accent])}>
                    <ServiceIcon slug={s.icon} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-canvas-dark">{s.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-text-muted">{s.shortDescription}</p>
                  <a
                    href={`/services/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green"
                  >
                    Explore Service <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <RevealOnScroll stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {s.whatWeDo.slice(0, 8).map((item) => (
                    <RevealItem
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border border-border-soft bg-canvas-soft px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                      <span className="text-[13px] leading-relaxed text-canvas-dark">{item}</span>
                    </RevealItem>
                  ))}
                </RevealOnScroll>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
