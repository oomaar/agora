"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { type CommentView, type PostView } from "@/types/domain";

// Drops the comment and the post's comment count once the server confirms.
export function useDeleteComment() {
  return useMutation<CommentView, null>({
    mutate: (source, comment) => source.deleteComment(comment.id),
    onSuccess: (cache, _, comment) => {
      cache.removeEntity(comment.id);
      cache.updateEntity<PostView>(comment.postId, (post) => ({
        ...post,
        commentCount: Math.max(0, post.commentCount - 1),
      }));
    },
  });
}
