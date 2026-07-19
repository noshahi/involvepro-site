import { Target, Palette, KeyRound, ShoppingCart, Search, Plug } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { requirementGroups } from "@/data/process";

const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "business-strategy": Target,
  "brand-content": Palette,
  "platform-access": KeyRound,
  ecommerce: ShoppingCart,
  "seo-analytics": Search,
  "technical-integration": Plug,
};

export function RequirementGathering() {
  return (
    <section aria-label="Requirement gathering" className="bg-canvas-soft px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[680px]">
          <SectionEyebrow>Getting started</SectionEyebrow>
          <h2 className="font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            What we may need before starting.
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-text-muted">
            The exact requirements depend on the project type, but most website, ecommerce, SaaS,
            AI automation, and SEO projects need a clear set of assets, access, and decisions
            before work begins.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {requirementGroups.map((group) => {
            const Icon = groupIcons[group.key];
            return (
              <RevealItem key={group.key} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border-soft bg-white p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-green to-brand-green-deep">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-[15.5px] font-semibold text-canvas-dark">{group.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-text-muted">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
