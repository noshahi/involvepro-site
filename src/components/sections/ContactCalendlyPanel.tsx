import { CalendarCheck2 } from "lucide-react";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";

export function ContactCalendlyPanel() {
  return (
    <div className="rounded-2xl border border-border-soft bg-canvas-soft p-6 sm:p-7">
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
        <CalendarCheck2 className="h-3.5 w-3.5 text-brand-green" /> Or schedule directly
      </div>
      <CalendlyEmbed height={640} />
    </div>
  );
}
