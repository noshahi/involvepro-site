import { cn } from "@/lib/cn";

type TextareaFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaField({ id, label, required, error, className, ...rest }: TextareaFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-semibold text-canvas-dark">
        {label} {required && <span className="text-brand-green">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "resize-y rounded-xl border bg-white px-4 py-3 text-[14px] leading-relaxed text-canvas-dark placeholder:text-text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green/40",
          error ? "border-red-400" : "border-border-soft focus:border-brand-green",
        )}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-[12px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
