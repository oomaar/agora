import { TYPING_DOT_DELAYS } from "@/lib/messages/constants";
import { typingLabel } from "@/utils/typingLabel";
import { cn } from "@/utils/cn";
import { type TypingIndicatorProps } from "@/types/messages";

// Three dots in a bubble while someone types. With reduced motion they stay still.
export function TypingIndicator({ people }: TypingIndicatorProps) {
  return (
    <div className="flex flex-col items-start">
      <span
        aria-hidden="true"
        className="flex h-9.5 items-center gap-1 rounded-2xl bg-ag-raised px-3.5"
      >
        {TYPING_DOT_DELAYS.map((delay) => (
          <span
            key={delay}
            className={cn(
              "size-1.5 rounded-full bg-ag-text-secondary motion-safe:animate-typing",
              delay,
            )}
          />
        ))}
      </span>
      <span className="sr-only">{typingLabel(people)}</span>
    </div>
  );
}
