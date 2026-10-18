import { LogoMark } from "@/components/ui/LogoMark";
import { LOGO_SIZES } from "@/lib/ui/logo";
import { cn } from "@/utils/cn";
import { type LogoProps } from "@/types/logo";

export function Logo({ size = "md", showWordmark = true, className }: LogoProps) {
  const config = LOGO_SIZES[size];
  return (
    <span
      role="img"
      aria-label="Agora"
      className={cn("inline-flex items-center", config.gapClassName, className)}
    >
      <LogoMark size={config.mark} />
      {showWordmark && (
        <span
          aria-hidden="true"
          className={cn("font-bold lowercase leading-none tracking-[-0.035em] text-ag-text", config.wordmarkClassName)}
        >
          agora
        </span>
      )}
    </span>
  );
}
