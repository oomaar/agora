import { Skeleton } from "@/components/ui/Skeleton";
import { type RailSkeletonProps } from "@/types/shell";

export function RailSkeleton({ variant, rows }: RailSkeletonProps) {
  return (
    <ul aria-hidden="true">
      {Array.from({ length: rows }, (_, index) =>
        variant === "text" ? (
          <li key={index} className="flex flex-col gap-2 px-4 py-2.5">
            <Skeleton className="w-24" />
            <Skeleton className="w-40" />
          </li>
        ) : (
          <li key={index} className="flex items-center gap-2.5 px-4 py-2.5">
            <Skeleton shape="circle" className="size-9 flex-none" />
            <span className="flex flex-1 flex-col gap-2">
              <Skeleton className="w-28" />
              <Skeleton className="w-20" />
            </span>
            <Skeleton className="h-8 w-18 rounded-full" />
          </li>
        ),
      )}
    </ul>
  );
}
