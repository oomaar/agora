import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";
import { type PostSkeletonProps } from "@/types/skeleton";

// Mirrors the post card layout so content doesn't jump when it loads.
export function PostSkeleton({
  withMedia = true,
  divider = true,
  className,
}: PostSkeletonProps) {
  return (
    <div
      className={cn(
        "flex gap-3 px-5 py-4",
        divider && "border-b border-ag-border-subtle",
        className,
      )}
    >
      <Skeleton shape="circle" className="size-10 flex-none" />
      <div className="flex flex-1 flex-col gap-2.5 pt-1">
        <Skeleton className="w-[36%]" />
        <Skeleton className="w-[94%]" />
        <Skeleton className="w-[68%]" />
        {withMedia && <Skeleton shape="block" className="h-37.5 w-full" />}
      </div>
    </div>
  );
}
