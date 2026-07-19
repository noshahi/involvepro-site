import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Pill } from "@/components/ui/Pill";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section aria-label={eyebrow} className="relative overflow-hidden bg-canvas-dark px-6 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-brand-blue/15 blur-[120px]" />

      <RevealOnScroll className="relative mx-auto max-w-[1280px]">
        <Pill tone="green">{eyebrow}</Pill>
        <h1 className="mt-6 max-w-[760px] font-sans text-[clamp(32px,5vw,54px)] font-bold leading-[1.08] tracking-[-1.5px] text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-[600px] text-[16.5px] leading-[1.65] text-white/60">{description}</p>
        {children}
      </RevealOnScroll>
    </section>
  );
}
