import { TrendingUp, BadgeCheck, Code2, Flag, Terminal } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { proofStats } from "@/lib/data/stats";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "trending-up": TrendingUp,
  "badge-check": BadgeCheck,
  "code-2": Code2,
  flag: Flag,
  terminal: Terminal,
};

export function ProofBand() {
  return (
    <section aria-label="Proof" className="relative overflow-hidden bg-brand-navy px-6 py-24 sm:py-28">
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionEyebrow tone="light">Proof, not promises</SectionEyebrow>
          <h2 className="font-sans text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.12] tracking-[-1px] text-white">
            Trusted for technical execution, not just nice-looking pages.
          </h2>
          <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-white/55">
            involvepro has supported hundreds of website, ecommerce, SEO, and development projects
            across Shopify, WordPress, custom tools, local businesses, B2B companies, SaaS-style
            platforms, and high-visibility brands.
          </p>
          <p className="mt-5 max-w-[440px] text-[13px] leading-relaxed text-white/35">
            Experience supporting growth-focused brands, including businesses with Shark
            Tank-related visibility and deal momentum.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {proofStats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <RevealItem
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon className="h-5 w-5 text-brand-blue" />
                <div className="mt-4 font-sans text-[26px] font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-[12.5px] leading-snug text-white/45">{stat.label}</div>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
