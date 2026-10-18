import { LogoMark } from "@/components/ui/LogoMark";
import { cn } from "@/utils/cn";
import { type AppIconProps } from "@/types/logo";

export function AppIcon({ className }: AppIconProps) {
  return (
    <span
      role="img"
      aria-label="Agora"
      className={cn(
        "grid size-16 place-items-center rounded-[15px] border border-ag-border bg-ag-bg",
        className,
      )}
    >
      <LogoMark size={40} />
    </span>
  );
}
