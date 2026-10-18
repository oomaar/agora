import { Icon } from "@/components/ui/Icon";
import { FIELD_BORDER, FIELD_CONTROL_BASE, FIELD_SIZES } from "@/lib/ui/field";
import { cn } from "@/utils/cn";
import { type SearchInputProps } from "@/types/field";

export function SearchInput({
  label,
  className,
  wrapperClassName,
  ...props
}: SearchInputProps) {
  return (
    <div role="search" className={cn("relative", wrapperClassName)}>
      <Icon
        name="search"
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ag-text-placeholder"
      />
      <input
        type="search"
        aria-label={label}
        className={cn(
          FIELD_CONTROL_BASE,
          FIELD_SIZES.md,
          FIELD_BORDER,
          "rounded-full pl-10.5 pr-4 text-[14.5px]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
