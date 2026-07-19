import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { workItems } from "@/lib/data/work";
import { cn } from "@/lib/cn";

const sizeClasses = {
  large: "md:col-span-4 md:row-span-2",
  medium: "md:col-span-2 md:row-span-2",
  small: "md:col-span-2",
};

export function WorkBento() {
  return (
    <section id="work" aria-label="Featured work" className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow>Selected work</SectionEyebrow>
            <h2 className="max-w-[620px] font-sans text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-canvas-dark">
              Work across ecommerce, B2B, SaaS, and high-visibility brands.
            </h2>
          </div>
          <a href="#work" className="font-semibold text-[14.5px] text-brand-green hover:text-brand-green-deep">
            View all projects →
          </a>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[110px]">
          {workItems.map((item) => (
            <RevealItem key={item.name} className={cn(sizeClasses[item.size], "h-full")}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(6,18,13,0.1)]">
                <div
                  className="relative h-28 shrink-0 md:h-full md:flex-1"
                  style={{ background: item.gradient }}
                >
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-brand-green-soft px-2.5 py-0.5 text-[10.5px] font-semibold text-brand-green-deep">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-[15px] font-semibold text-canvas-dark">{item.name}</h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-text-muted">{item.result}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-green">
                    View Work <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
