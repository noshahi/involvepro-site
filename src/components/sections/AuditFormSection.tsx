import { SectionEyebrow } from "@/components/ui/GlassCard";
import { AuditForm } from "@/components/ui/AuditForm";
import { AuditValuePanel } from "@/components/sections/AuditValuePanel";

export function AuditFormSection() {
  return (
    <section id="audit-form" aria-label="Request your audit" className="scroll-mt-24 bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Request your audit</SectionEyebrow>
        <h2 className="max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          Tell us what to review.
        </h2>
        <p className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed text-text-muted">
          Share your website and what you want us to focus on. We&rsquo;ll review the context and
          respond with practical recommendations.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <AuditValuePanel />
          <div className="relative rounded-2xl border border-border-soft bg-white p-6 sm:p-8">
            <AuditForm />
          </div>
        </div>
      </div>
    </section>
  );
}
