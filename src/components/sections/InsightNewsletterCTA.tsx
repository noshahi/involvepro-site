import { FileText, ListChecks, HelpCircle, Link2, Braces } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";

const trustPoints = [
  { icon: FileText, label: "Direct answers" },
  { icon: ListChecks, label: "Key takeaways" },
  { icon: HelpCircle, label: "FAQs" },
  { icon: Link2, label: "Internal links" },
  { icon: Braces, label: "Schema-ready sections" },
];

export function InsightNewsletterCTA() {
  return (
    <section aria-label="Content approach" className="relative overflow-hidden bg-canvas-dark px-6 py-24 sm:py-28">
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-[900px] text-center">
        <SectionEyebrow tone="light" className="mx-auto w-fit">
          Content approach
        </SectionEyebrow>
        <h2 className="font-sans text-[clamp(24px,3.2vw,36px)] font-bold leading-[1.16] tracking-[-1px] text-white">
          Built for search engines, AI systems, and real buyers.
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[15.5px] leading-relaxed text-white/60">
          Our content structure supports direct answers, key takeaways, FAQs, internal links,
          schema-ready sections, and practical guidance instead of shallow blog filler.
        </p>

        <RevealOnScroll stagger className="mx-auto mt-10 flex max-w-[720px] flex-wrap items-center justify-center gap-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <RevealItem key={label}>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12.5px] font-medium text-white/75">
                <Icon className="h-3.5 w-3.5 text-brand-green" /> {label}
              </span>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
