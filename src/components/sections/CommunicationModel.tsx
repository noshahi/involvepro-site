import { Mail, Video, MessageCircle, MessageSquare, Users, Monitor, CheckCircle2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { communicationMethods, communicationMilestones } from "@/data/process";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  video: Video,
  "message-circle": MessageCircle,
  "message-square": MessageSquare,
  users: Users,
  monitor: Monitor,
};

export function CommunicationModel() {
  return (
    <section aria-label="Communication model" className="relative overflow-hidden bg-canvas-dark px-6 py-24 sm:py-28">
      <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[640px]">
          <SectionEyebrow tone="light">Communication</SectionEyebrow>
          <h2 className="font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-white">
            Clear communication without unnecessary noise.
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-white/55">
            We keep routine communication organized around the project scope, priorities,
            feedback cycles, and launch milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              Channels
            </p>
            <div className="grid grid-cols-2 gap-3">
              {communicationMethods.map((method) => {
                const Icon = icons[method.icon];
                return (
                  <div
                    key={method.label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-3.5 py-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-blue">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-white">{method.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              Operating rhythm
            </p>
            <RevealOnScroll stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {communicationMilestones.map((milestone) => (
                <RevealItem
                  key={milestone.title}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-[#0c1712] px-4 py-3.5"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                  <div>
                    <p className="text-[12.5px] font-semibold text-white">{milestone.title}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-white/45">{milestone.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
