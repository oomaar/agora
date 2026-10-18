import { SKELETON_SHAPES } from "@/lib/ui/skeleton";
import { cn } from "@/utils/cn";
import { type SkeletonProps } from "@/types/skeleton";

export function Skeleton({ shape = "line", className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block motion-safe:animate-pulse", SKELETON_SHAPES[shape], className)}
    />
  );
}
