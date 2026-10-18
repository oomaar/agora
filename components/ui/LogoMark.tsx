import { getLogoStrokeWidth } from "@/utils/getLogoStrokeWidth";
import { cn } from "@/utils/cn";
import { type LogoMarkProps } from "@/types/logo";

export function LogoMark({ size, strokeWidth, className }: LogoMarkProps) {
  const stroke = strokeWidth ?? getLogoStrokeWidth(size);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("block flex-none", className)}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="7" className="fill-ag-accent" />
      <circle
        cx="10.6"
        cy="12.6"
        r="4.6"
        strokeWidth={stroke}
        className="fill-none stroke-ag-on-accent"
      />
      <path
        d="M15.2 7.6v8.6c0 1.7 1 2.6 2.6 2.6"
        strokeWidth={stroke}
        strokeLinecap="round"
        className="fill-none stroke-ag-on-accent"
      />
    </svg>
  );
}
