"use client";

import { useMutation } from "@/hooks/useMutation";
import { useToast } from "@/hooks/useToast";
import { type PostView } from "@/types/domain";

// Optimistic: the repost state and count flip at once and revert if the server fails.
export function useToggleRepost() {
  const toast = useToast();
  return useMutation<PostView, PostView>({
    mutate: (source, post) => source.setRepost(post.id, !post.reposted),
    onMutate: (cache, post) => {
      const delta = post.reposted ? -1 : 1;
      cache.updateEntity<PostView>(post.id, (current) => ({
        ...current,
        reposted: !post.reposted,
        repostCount: current.repostCount + delta,
      }));
      return () =>
        cache.updateEntity<PostView>(post.id, (current) => ({
          ...current,
          reposted: post.reposted,
          repostCount: current.repostCount - delta,
        }));
    },
    onSuccess: (cache, result) =>
      cache.updateEntity<PostView>(result.id, (current) => ({
        ...current,
        reposted: result.reposted,
        repostCount: result.repostCount,
      })),
    onError: (_error, post) =>
      toast.error(
        `Couldn't ${post.reposted ? "undo" : "save"} your repost. It was reverted.`,
      ),
  });
}
