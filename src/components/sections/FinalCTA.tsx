import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FinalCTA() {
  return (
    <section
      id="contact"
      aria-label="Book a call"
      className="relative overflow-hidden px-6 py-24 text-center sm:py-28"
      style={{ background: "linear-gradient(120deg, #082848, #06120D 55%, #2F7A21)" }}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[680px]">
        <h2 className="font-sans text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] tracking-[-1px] text-white">
          Need a technical team that can build, optimize, and keep improving?
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-[16px] leading-relaxed text-white/70">
          Book a call to discuss your Shopify store, WordPress website, SaaS product, SEO system,
          AI automation, or custom development project.
        </p>
        <div className="mt-9 flex justify-center">
          <MagneticButton
            href="https://calendly.com/involvepro/30min"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
          >
            Book a Call <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
