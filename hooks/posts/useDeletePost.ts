"use client";

import { useMutation } from "@/hooks/data/useMutation";

// Waits for the server, then drops the post from every cached list.
export function useDeletePost() {
  return useMutation<string, null>({
    mutate: (source, postId) => source.deletePost(postId),
    onSuccess: (cache, _, postId) => cache.removeEntity(postId),
  });
}
