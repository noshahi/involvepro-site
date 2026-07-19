import { Info } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { timelineBands, largeBuildTimeline } from "@/data/process";

const segmentColors = [
  "bg-brand-green",
  "bg-brand-green-deep",
  "bg-brand-navy",
  "bg-brand-blue",
  "bg-[#2F7A21]",
];

export function ProjectTimeline() {
  const totalWeight = timelineBands.reduce((sum, band) => sum + band.weight, 0);

  return (
    <section aria-label="Project timelines" className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[680px]">
          <SectionEyebrow>Timelines</SectionEyebrow>
          <h2 className="font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
            Timelines depend on scope, content readiness, and approvals.
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-text-muted">
            Smaller improvements can move quickly. Full website builds, Shopify redesigns, SaaS
            products, and automation systems require more planning, testing, and review.
          </p>
        </div>

        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {timelineBands.map((band, i) => (
            <div
              key={band.label}
              className={segmentColors[i % segmentColors.length]}
              style={{ width: `${(band.weight / totalWeight) * 100}%` }}
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {timelineBands.map((band, i) => (
            <div key={band.label} className="rounded-2xl border border-border-soft bg-canvas-soft p-5">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${segmentColors[i % segmentColors.length]}`} />
              <h3 className="mt-3 text-[14.5px] font-semibold text-canvas-dark">{band.label}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-muted">{band.duration}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-brand-green/25 bg-brand-green-soft p-6">
          <h3 className="text-[15px] font-semibold text-brand-green-deep">{largeBuildTimeline.label}</h3>
          <p className="mt-1.5 max-w-[680px] text-[13px] leading-relaxed text-canvas-dark/70">
            {largeBuildTimeline.duration}
          </p>
        </div>

        <div className="mt-6 flex items-start gap-2.5 text-[12.5px] leading-relaxed text-text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
          Timelines can shift if content, access, assets, or approvals are delayed.
        </div>
      </div>
    </section>
  );
}
