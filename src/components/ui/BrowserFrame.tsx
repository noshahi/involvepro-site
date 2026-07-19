import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  children: React.ReactNode;
  label?: string;
  className?: string;
  dark?: boolean;
};

export function BrowserFrame({ children, label, className, dark = true }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border",
        dark ? "border-white/10 bg-[#0c1712]" : "border-border-soft bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 border-b px-4 py-3",
          dark ? "border-white/10" : "border-border-soft",
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5534b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e6b422]" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
        {label && (
          <span
            className={cn(
              "ml-2.5 font-mono text-[11px]",
              dark ? "text-white/40" : "text-text-muted",
            )}
          >
            {label}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
