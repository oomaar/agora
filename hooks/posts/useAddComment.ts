"use client";

import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useMutation } from "@/hooks/data/useMutation";
import { queryKeys } from "@/lib/data/queryKeys";
import { createTempId } from "@/utils/createTempId";
import { type AddCommentVariables } from "@/types/query";
import { type CommentView, type PostView } from "@/types/domain";

// Optimistic: the comment shows as Sending… straight away, then sent or failed.
// A failed comment stays in the list so it can be retried.
export function useAddComment(postId: string) {
  const { data: self } = useCurrentUser();
  const key = queryKeys.comments(postId);
  const mutation = useMutation<AddCommentVariables, CommentView>({
    mutate: (source, { text }) => source.addComment(postId, text),
    onMutate: (cache, { tempId, text }) => {
      if (!self) return;
      cache.setData<CommentView[]>(key, (comments) =>
        comments.some((comment) => comment.id === tempId)
          ? comments.map((comment) =>
              comment.id === tempId
                ? { ...comment, status: "sending" }
                : comment,
            )
          : [
              {
                id: tempId,
                postId,
                authorId: self.id,
                text,
                createdAt: new Date().toISOString(),
                editedAt: null,
                author: self,
                status: "sending",
              },
              ...comments,
            ],
      );
      return () =>
        cache.updateEntity<CommentView>(tempId, (comment) => ({
          ...comment,
          status: "failed",
        }));
    },
    onSuccess: (cache, comment, { tempId }) => {
      cache.setData<CommentView[]>(key, (comments) =>
        comments.some((item) => item.id === tempId)
          ? comments.map((item) => (item.id === tempId ? comment : item))
          : [comment, ...comments],
      );
      cache.updateEntity<PostView>(postId, (post) => ({
        ...post,
        commentCount: post.commentCount + 1,
      }));
    },
  });
  return {
    status: mutation.status,
    error: mutation.error,
    add: (text: string) => mutation.run({ tempId: createTempId(), text }),
    retry: (comment: CommentView) =>
      mutation.run({ tempId: comment.id, text: comment.text }),
  };
}
