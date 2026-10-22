"use client";

import { PostItem } from "@/components/post/PostItem";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { FEED_SKELETON_COUNT } from "@/lib/posts/constants";
import { type PostListProps } from "@/types/feed";

// A list of posts with its loading, error, empty and "all caught up" states.
export function PostList({
  query,
  emptyTitle,
  emptyDescription,
  emptyActions,
  errorTitle,
  loading,
}: PostListProps) {
  if (query.status === "loading") {
    return (
      loading ?? (
        <div role="status" aria-label="Loading posts">
          {Array.from({ length: FEED_SKELETON_COUNT }, (_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )
    );
  }

  if (query.status === "error") {
    return (
      <ErrorState
        title={errorTitle}
        description={query.error.message}
        actions={
          <Button variant="danger" onClick={query.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  if (query.status === "empty") {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actions={emptyActions}
      />
    );
  }

  return (
    <>
      {query.data.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <p className="p-6 text-center text-[13px] text-ag-text-placeholder">
        You&apos;re all caught up
      </p>
    </>
  );
}
