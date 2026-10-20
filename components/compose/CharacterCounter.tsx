import { CHARS_WARNING_AT } from "@/lib/posts/constants";
import { cn } from "@/utils/cn";
import { type CharacterCounterProps } from "@/types/compose";

export function CharacterCounter({ length, max }: CharacterCounterProps) {
  const left = max - length;
  return (
    <span
      aria-label={
        left < 0
          ? `${-left} characters over the limit`
          : `${left} characters left`
      }
      className={cn(
        "font-mono text-[12px]",
        left < 0
          ? "text-ag-danger"
          : left <= CHARS_WARNING_AT
            ? "text-ag-accent-text"
            : "text-ag-text-secondary",
      )}
    >
      {left}
    </span>
  );
}
