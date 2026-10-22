import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { EXPLORE_SKELETON_ROWS } from "@/lib/explore/constants";
import { type ExploreQueryProps } from "@/types/explore";

// Loading, error and empty states for an Explore section; renders `children` once there's something to show.
export function ExploreQuery<T>({
  query,
  errorText,
  emptyText,
  isEmpty,
  skeletonRows = EXPLORE_SKELETON_ROWS,
  children,
}: ExploreQueryProps<T>) {
  if (query.status === "loading") {
    return (
      <div role="status" aria-label="Loading">
        {Array.from({ length: skeletonRows }, (_, index) => (
          <PostSkeleton key={index} withMedia={false} divider={false} />
        ))}
      </div>
    );
  }
  if (query.status === "error") {
    return (
      <div role="alert" className="flex flex-col items-start gap-1 px-5 py-3">
        <p className="text-[14px] text-ag-text-secondary">{errorText}</p>
        <button
          type="button"
          onClick={query.retry}
          className="cursor-pointer rounded-sm text-[14px] text-ag-accent-text outline-none hover:underline focus-visible:underline"
        >
          Try again
        </button>
      </div>
    );
  }
  if (query.status === "empty" || isEmpty?.(query.data)) {
    return (
      <p className="px-5 py-3 text-[14px] text-ag-text-secondary">
        {emptyText}
      </p>
    );
  }
  return children(query.data);
}
