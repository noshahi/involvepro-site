import { cn } from "@/lib/cn";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em]",
        tone === "dark" ? "text-brand-green-deep" : "text-[#8FE070]",
        className,
      )}
    >
      {children}
    </div>
  );
}
