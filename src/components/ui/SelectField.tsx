import { cn } from "@/lib/cn";

type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  id,
  label,
  options,
  placeholder = "Select an option",
  required,
  error,
  className,
  ...rest
}: SelectFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-semibold text-canvas-dark">
        {label} {required && <span className="text-brand-green">*</span>}
      </label>
      <select
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        defaultValue=""
        className={cn(
          "rounded-xl border bg-white px-4 py-3 text-[14px] text-canvas-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green/40",
          error ? "border-red-400" : "border-border-soft focus:border-brand-green",
        )}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-[12px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
