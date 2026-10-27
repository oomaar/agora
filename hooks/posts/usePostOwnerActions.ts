"use client";

import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import { useToast } from "@/hooks/ui/useToast";
import { POST_MAX_LENGTH } from "@/lib/data/constants";
import { type PostView } from "@/types/domain";
import { type OwnerActions } from "@/types/owner";

// `onDeleted` runs after a delete, e.g. to leave the post's own page.
export function usePostOwnerActions(
  post: PostView,
  onDeleted?: () => void,
): OwnerActions {
  const update = useUpdatePost();
  const remove = useDeletePost();
  const toast = useToast();
  return {
    noun: "post",
    text: post.text,
    maxLength: POST_MAX_LENGTH,
    saving: update.status === "pending",
    saveError: update.error?.message ?? null,
    save: async (text) => {
      if (!(await update.run({ id: post.id, text }))) return false;
      toast.success("Post updated");
      return true;
    },
    deleting: remove.status === "pending",
    deleteError: remove.error?.message ?? null,
    remove: async () => {
      if ((await remove.run(post.id)) === undefined) return false;
      toast.success("Post deleted");
      onDeleted?.();
      return true;
    },
    resetErrors: () => {
      update.reset();
      remove.reset();
    },
  };
}
