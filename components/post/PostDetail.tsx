"use client";

import { useAppRouter } from "@/hooks/shell/useAppRouter";
import { PostThread } from "@/components/post/PostThread";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { usePost } from "@/hooks/posts/usePost";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { type PostDetailProps } from "@/types/postDetail";

export function PostDetail({ postId }: PostDetailProps) {
  const router = useAppRouter();
  const post = usePost(postId);

  if (post.status === "loading") {
    return (
      <div role="status" aria-label="Loading post">
        <PostSkeleton />
      </div>
    );
  }

  if (post.status === "error") {
    if (post.error.code === "not-found") {
      return (
        <EmptyState
          icon="alert"
          title="This post isn't available"
          description="It may have been deleted, or only the author's followers can see it."
          actions={
            <Button
              variant="secondary"
              onClick={() => router.push(NAV_ITEMS[0].href)}
            >
              Back to Home
            </Button>
          }
        />
      );
    }
    return (
      <ErrorState
        title="Couldn't load this post"
        description={post.error.message}
        actions={
          <Button variant="danger" onClick={post.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  return <PostThread post={post.data} />;
}
