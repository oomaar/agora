"use client";

import { CommentItem } from "@/components/post/CommentItem";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { useAddComment } from "@/hooks/posts/useAddComment";
import { useComments } from "@/hooks/posts/useComments";
import { FEED_SKELETON_COUNT } from "@/lib/posts/constants";
import { type CommentListProps } from "@/types/postDetail";

export function CommentList({ postId }: CommentListProps) {
  const comments = useComments(postId);
  const { retry } = useAddComment(postId);

  if (comments.status === "loading") {
    return (
      <div role="status" aria-label="Loading comments">
        {Array.from({ length: FEED_SKELETON_COUNT }, (_, index) => (
          <PostSkeleton key={index} withMedia={false} />
        ))}
      </div>
    );
  }

  if (comments.status === "error") {
    return (
      <ErrorState
        compact
        title="Couldn't load the comments"
        description={comments.error.message}
        actions={
          <Button variant="danger" size="sm" onClick={comments.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-4"
      />
    );
  }

  if (comments.status === "empty") {
    return (
      <EmptyState
        compact
        icon="comment"
        title="No comments yet"
        description="Start the conversation with a reply."
      />
    );
  }

  return (
    <ul aria-label="Comments">
      {comments.data.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onRetry={retry} />
      ))}
    </ul>
  );
}
