import { type LogoMarkProps } from "@/types/designSystem";

export function LogoMark({ size, strokeWidth = 2.4 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="block flex-none"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="7" className="fill-ag-accent" />
      <circle
        cx="10.6"
        cy="12.6"
        r="4.6"
        strokeWidth={strokeWidth}
        className="fill-none stroke-ag-on-accent"
      />
      <path
        d="M15.2 7.6v8.6c0 1.7 1 2.6 2.6 2.6"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="fill-none stroke-ag-on-accent"
      />
    </svg>
  );
}
