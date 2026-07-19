import { cn } from "@/lib/cn";

type PillProps = {
  children: React.ReactNode;
  tone?: "green" | "blue" | "navy" | "light";
  className?: string;
  icon?: React.ReactNode;
};

const toneClasses: Record<NonNullable<PillProps["tone"]>, string> = {
  green: "bg-brand-green/15 border-brand-green/40 text-[#8FE070]",
  blue: "bg-brand-blue/10 border-brand-blue/40 text-brand-blue",
  navy: "bg-brand-navy/10 border-brand-navy/30 text-brand-navy",
  light: "bg-black/5 border-black/10 text-text-main",
};

export function Pill({ children, tone = "green", className, icon }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em]",
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
