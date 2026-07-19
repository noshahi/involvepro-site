import { ArrowRight } from "lucide-react";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

export function AuditCTA() {
  return (
    <section
      aria-label="Get your free audit"
      className="relative overflow-hidden px-6 py-24 text-center sm:py-28"
      style={{ background: "linear-gradient(120deg, #082848, #06120D 55%, #00BCEA)" }}
    >
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[640px]">
        <h2 className="font-sans text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-white">
          Want a clearer view of what to fix first?
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[15.5px] leading-relaxed text-white/70">
          Request a free audit and we&rsquo;ll help identify practical improvements for your
          website, store, SEO visibility, conversion path, or automation workflow.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <a
            href="#audit-form"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-deep"
          >
            Get my free audit <ArrowRight className="h-4 w-4" />
          </a>
          <ScheduleMeetingButton variant="outline" label="Schedule a Meeting" />
        </div>
        <p className="mt-4 text-[12.5px] text-white/40">Free · No obligation · Practical next steps</p>
      </div>
    </section>
  );
}
