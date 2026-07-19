import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type SubmitButtonProps = {
  label: string;
  loadingLabel?: string;
  loading?: boolean;
  className?: string;
};

export function SubmitButton({ label, loadingLabel = "Sending...", loading, className }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green-deep disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> {loadingLabel}
        </>
      ) : (
        <>
          {label} <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}
