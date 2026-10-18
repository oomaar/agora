import { cn } from "@/utils/cn";
import { type FieldProps } from "@/types/field";

// Label, control and hint or error, linked by id.
export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  const message = error ?? hint;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-[13px] text-ag-text-secondary">
          {label}
        </label>
      )}
      {children}
      {message && (
        <span
          id={`${id}-message`}
          className={cn(
            "text-caption",
            error ? "text-ag-danger" : "text-ag-text-secondary",
          )}
        >
          {message}
        </span>
      )}
    </div>
  );
}
