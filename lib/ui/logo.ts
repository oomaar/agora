import { type LogoSize, type LogoSizeConfig } from "@/types/logo";

// Gap between mark and wordmark = 0.3 × mark size.
export const LOGO_SIZES: Record<LogoSize, LogoSizeConfig> = {
  sm: { mark: 16, wordmarkClassName: "text-[14px]", gapClassName: "gap-[5px]" },
  md: { mark: 24, wordmarkClassName: "text-[20px]", gapClassName: "gap-[7px]" },
  lg: { mark: 40, wordmarkClassName: "text-[34px]", gapClassName: "gap-3" },
};
