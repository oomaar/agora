"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { type CommentView } from "@/types/domain";
import { type EditTextVariables } from "@/types/query";

export function useUpdateComment() {
  return useMutation<EditTextVariables, CommentView>({
    mutate: (source, { id, text }) => source.updateComment(id, text),
    onSuccess: (cache, comment) =>
      cache.updateEntity<CommentView>(comment.id, (current) => ({
        ...current,
        text: comment.text,
        editedAt: comment.editedAt,
      })),
  });
}
