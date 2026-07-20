import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function AboutCTA() {
  return (
    <section
      aria-label="Work with involvepro"
      className="relative overflow-hidden px-6 py-24 text-center sm:py-28"
      style={{ background: "linear-gradient(120deg, #082848, #06120D 55%, #2F7A21)" }}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[640px]">
        <h2 className="font-sans text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-white">
          Ready to work with a technical team that can own the build properly?
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[15.5px] leading-relaxed text-white/70">
          Schedule a meeting to talk through your platform, or start with a free audit of what
          you have today.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <ScheduleMeetingButton variant="solid" />
          <MagneticButton href="/free-audit" variant="outline">
            Request a Free Audit
          </MagneticButton>
        </div>
        <p className="mt-4 text-[12.5px] text-white/40">Free 30-minute call · No obligation</p>
      </div>
    </section>
  );
}
