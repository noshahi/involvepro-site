import { cn } from "@/lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormField({ id, label, required, error, className, ...rest }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-semibold text-canvas-dark">
        {label} {required && <span className="text-brand-green">*</span>}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "rounded-xl border bg-white px-4 py-3 text-[14px] text-canvas-dark placeholder:text-text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green/40",
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
