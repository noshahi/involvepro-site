import { Gauge, ShoppingCart, Search, TrendingUp, Bot } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { auditFocusAreas } from "@/data/audit";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  gauge: Gauge,
  "shopping-cart": ShoppingCart,
  search: Search,
  "trending-up": TrendingUp,
  bot: Bot,
};

const accents = [
  "bg-gradient-to-br from-brand-blue to-brand-navy",
  "bg-gradient-to-br from-brand-green to-brand-green-deep",
  "bg-gradient-to-br from-brand-navy to-canvas-dark",
  "bg-gradient-to-br from-brand-green-deep to-brand-blue",
  "bg-gradient-to-br from-canvas-dark to-brand-navy",
];

export function AuditFocusAreas() {
  return (
    <section aria-label="What we can review" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Focus areas</SectionEyebrow>
        <h2 className="mb-12 max-w-[560px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          What we can review.
        </h2>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {auditFocusAreas.map((area, i) => {
            const Icon = icons[area.icon];
            return (
              <RevealItem key={area.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border-soft bg-canvas-soft p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]">
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${accents[i % accents.length]}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-[15.5px] font-semibold text-canvas-dark">{area.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">{area.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
