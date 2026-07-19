import { SectionEyebrow } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactCalendlyPanel } from "@/components/sections/ContactCalendlyPanel";

export function ContactFormSection() {
  return (
    <section id="contact-form" aria-label="Contact form" className="scroll-mt-24 bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Project inquiry</SectionEyebrow>
        <h2 className="max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          Share the basics. We will help define the next step.
        </h2>
        <p className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed text-text-muted">
          You do not need to have a perfect brief. Send the current website, business goal,
          service area, and any known requirements. We will review the context and respond with a
          practical path forward.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="rounded-2xl border border-border-soft bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
          <ContactCalendlyPanel />
        </div>
      </div>
    </section>
  );
}
