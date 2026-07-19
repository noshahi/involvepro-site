import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

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
          Let&apos;s scope your next build — no deck, no pressure.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-[16px] leading-relaxed text-white/70">
          30 minutes with our technical team to walk through your Shopify store, WordPress site,
          SaaS product, SEO system, or AI automation, and leave with a clear next step — whether
          that&apos;s us or not.
        </p>
        <div className="mt-9 flex justify-center">
          <ScheduleMeetingButton variant="solid" />
        </div>
        <p className="mt-4 text-[12.5px] text-white/40">Free 30-minute call · No obligation</p>
      </div>
    </section>
  );
}
