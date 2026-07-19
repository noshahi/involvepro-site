import { CheckCircle2, PhoneCall } from "lucide-react";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import { auditBenefits } from "@/data/audit";

export function AuditValuePanel() {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-green-deep">
          Free audit, real insight.
        </p>
        <p className="mt-4 max-w-[440px] text-[14.5px] leading-relaxed text-text-muted">
          Fill in a few details and we&rsquo;ll get to work. No sales pressure — just a clear view
          of where you stand and what to do next.
        </p>

        <ul className="mt-7 flex flex-col gap-3.5">
          {auditBenefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-canvas-dark">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl border border-border-soft bg-white p-6">
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
          <PhoneCall className="h-3.5 w-3.5 text-brand-green" /> Prefer to talk first?
        </div>
        <p className="mb-4 text-[13.5px] leading-relaxed text-text-muted">
          Book a free 30-minute strategy call and we&rsquo;ll review things live.
        </p>
        <ScheduleMeetingButton variant="dark" label="Book a 30-min call" showIcon={false} />
      </div>
    </div>
  );
}
