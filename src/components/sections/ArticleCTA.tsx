import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

export function ArticleCTA({ showAuditLink = false }: { showAuditLink?: boolean }) {
  return (
    <section
      aria-label="Schedule a meeting"
      className="relative overflow-hidden px-6 py-24 text-center sm:py-28"
      style={{ background: "linear-gradient(120deg, #082848, #06120D 55%, #2F7A21)" }}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[640px]">
        <h2 className="font-sans text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-white">
          Need help with this on your website?
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[15.5px] leading-relaxed text-white/70">
          Schedule a meeting with involvepro and we will help define the right technical, SEO,
          or development path.
        </p>
        <div className="mt-9 flex justify-center">
          <ScheduleMeetingButton variant="solid" />
        </div>
        <p className="mt-4 text-[12.5px] text-white/40">Free 30-minute call · No obligation</p>
        {showAuditLink && (
          <Link
            href="/free-audit"
            className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8FE070] hover:text-white"
          >
            Or request a Free Audit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
