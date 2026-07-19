import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Service } from "@/data/services";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";

export function ServiceCTA({ service }: { service: Service }) {
  return (
    <section
      aria-label="Schedule a meeting"
      className="relative overflow-hidden px-6 py-24 text-center sm:py-28"
      style={{ background: "linear-gradient(120deg, #082848, #06120D 55%, #2F7A21)" }}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[640px]">
        <h2 className="font-sans text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-white">
          Ready to talk through {service.title}?
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[15.5px] leading-relaxed text-white/70">
          30 minutes with our technical team to scope your project and leave with a clear next
          step.
        </p>
        <div className="mt-9 flex justify-center">
          <MagneticButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="solid">
            Schedule a Meeting <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
        <p className="mt-4 text-[12.5px] text-white/40">Free 30-minute call · No obligation</p>
      </div>
    </section>
  );
}
