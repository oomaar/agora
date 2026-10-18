import { type AvatarSize, type AvatarSizeConfig } from "@/types/avatar";

export const AVATAR_SIZES: Record<AvatarSize, AvatarSizeConfig> = {
  xs: { px: 28, className: "size-7 text-[11px] font-semibold" },
  sm: { px: 36, className: "size-9 text-[12.5px] font-semibold" },
  md: { px: 40, className: "size-10 text-[14px] font-semibold" },
  lg: { px: 46, className: "size-[46px] text-[15px] font-semibold" },
  xl: { px: 96, className: "size-24 border-4 border-ag-bg text-[28px] font-bold" },
};

// Order matches --ag-avatar-1 … --ag-avatar-4.
export const AVATAR_COLORS = [
  "bg-ag-avatar-1",
  "bg-ag-avatar-2",
  "bg-ag-avatar-3",
  "bg-ag-avatar-4",
];
