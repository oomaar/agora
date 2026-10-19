"use client";

import { useMutation } from "@/hooks/useMutation";
import { useToast } from "@/hooks/useToast";
import { type PostView } from "@/types/domain";

// Optimistic: the heart and count flip at once and revert if the server fails.
export function useToggleLike() {
  const toast = useToast();
  return useMutation<PostView, PostView>({
    mutate: (source, post) => source.setLike(post.id, !post.liked),
    onMutate: (cache, post) => {
      const delta = post.liked ? -1 : 1;
      cache.updateEntity<PostView>(post.id, (current) => ({
        ...current,
        liked: !post.liked,
        likeCount: current.likeCount + delta,
      }));
      return () =>
        cache.updateEntity<PostView>(post.id, (current) => ({
          ...current,
          liked: post.liked,
          likeCount: current.likeCount - delta,
        }));
    },
    onSuccess: (cache, result) =>
      cache.updateEntity<PostView>(result.id, (current) => ({
        ...current,
        liked: result.liked,
        likeCount: result.likeCount,
      })),
    onError: (_error, post) =>
      toast.error(
        `Couldn't ${post.liked ? "remove" : "save"} your like. It was reverted.`,
      ),
  });
}
