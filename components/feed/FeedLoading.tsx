import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { Spinner } from "@/components/ui/Spinner";
import { FEED_SKELETON_COUNT } from "@/lib/posts/constants";

export function FeedLoading() {
  return (
    <div role="status">
      <p className="flex items-center gap-2 border-b border-ag-border-subtle px-5 py-3 text-[13px] text-ag-text-secondary">
        <Spinner />
        Loading your feed…
      </p>
      {Array.from({ length: FEED_SKELETON_COUNT }, (_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}
