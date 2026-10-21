"use client";

import { useToast } from "@/hooks/ui/useToast";
import { postPath } from "@/utils/postPath";
import { type PostView } from "@/types/domain";

// Copies the post's link.
export function useSharePost() {
  const toast = useToast();
  return async (post: PostView) => {
    const url = new URL(postPath(post.id), window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };
}
