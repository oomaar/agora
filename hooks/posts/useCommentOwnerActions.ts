"use client";

import { useDeleteComment } from "@/hooks/posts/useDeleteComment";
import { useUpdateComment } from "@/hooks/posts/useUpdateComment";
import { useToast } from "@/hooks/ui/useToast";
import { COMMENT_MAX_LENGTH } from "@/lib/data/constants";
import { type CommentView } from "@/types/domain";
import { type OwnerActions } from "@/types/owner";

export function useCommentOwnerActions(comment: CommentView): OwnerActions {
  const update = useUpdateComment();
  const remove = useDeleteComment();
  const toast = useToast();
  return {
    noun: "comment",
    text: comment.text,
    maxLength: COMMENT_MAX_LENGTH,
    saving: update.status === "pending",
    saveError: update.error?.message ?? null,
    save: async (text) => {
      if (!(await update.run({ id: comment.id, text }))) return false;
      toast.success("Comment updated");
      return true;
    },
    deleting: remove.status === "pending",
    deleteError: remove.error?.message ?? null,
    remove: async () => {
      if ((await remove.run(comment)) === undefined) return false;
      toast.success("Comment deleted");
      return true;
    },
    resetErrors: () => {
      update.reset();
      remove.reset();
    },
  };
}
