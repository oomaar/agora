import { type SkeletonShape } from "@/types/skeleton";

export const SKELETON_SHAPES: Record<SkeletonShape, string> = {
  line: "h-2.5 rounded-[4px] bg-ag-skeleton",
  circle: "rounded-full bg-ag-skeleton",
  block: "rounded-lg bg-ag-skeleton-media",
};
