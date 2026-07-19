import Link from "next/link";
import {
  ShoppingBag, Layers, Workflow, Search, Globe, LayoutTemplate,
  Code2, TrendingUp, ShieldCheck, Zap, ArrowRight,
} from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { primaryServices, secondaryServices } from "@/data/services";

const primaryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "shopping-bag": ShoppingBag,
  layers: Layers,
  workflow: Workflow,
  search: Search,
};

const secondaryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  "layout-template": LayoutTemplate,
  "code-2": Code2,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  zap: Zap,
};

const accentClasses = {
  green: "bg-gradient-to-br from-brand-green to-brand-green-deep",
  blue: "bg-gradient-to-br from-brand-blue to-brand-navy",
  navy: "bg-gradient-to-br from-brand-navy to-canvas-dark",
};

export function BentoServices() {
  return (
    <section id="services" aria-label="Services" className="bg-canvas-soft px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow>What we do</SectionEyebrow>
            <h2 className="max-w-[620px] font-sans text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-canvas-dark">
              One technical team for websites, ecommerce, SaaS, SEO, and automation.
            </h2>
          </div>
          <Link href="/services" className="font-semibold text-[14.5px] text-brand-green hover:text-brand-green-deep">
            View all services →
          </Link>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {primaryServices.map((s) => {
            const Icon = primaryIcons[s.icon];
            return (
              <RevealItem key={s.title}>
                <a
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border-soft bg-white p-7 shadow-[0_1px_2px_rgba(6,18,13,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]"
                >
                  <div>
                    <div className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${accentClasses[s.accent]}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      {s.eyebrow}
                    </span>
                    <h3 className="mt-2 text-[18px] font-semibold text-canvas-dark">{s.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">{s.shortDescription}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green">
                    Explore Service
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </RevealItem>
            );
          })}
        </RevealOnScroll>

        <RevealOnScroll stagger className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryServices.map((s) => {
            const Icon = secondaryIcons[s.icon];
            return (
              <RevealItem key={s.title}>
                <a
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border-soft bg-white px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-[0_12px_28px_rgba(6,18,13,0.08)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-canvas-soft">
                    <Icon className="h-4 w-4 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-canvas-dark">{s.title}</h3>
                    <p className="mt-0.5 text-[12.5px] text-text-muted">{s.shortDescription}</p>
                  </div>
                </a>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
