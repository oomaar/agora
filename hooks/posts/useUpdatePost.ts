"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { type PostView } from "@/types/domain";
import { type EditTextVariables } from "@/types/query";

// Not optimistic: the edit dialog shows Saving… and keeps the text if it fails.
export function useUpdatePost() {
  return useMutation<EditTextVariables, PostView>({
    mutate: (source, { id, text }) => source.updatePost(id, text),
    onSuccess: (cache, post) =>
      cache.updateEntity<PostView>(post.id, (current) => ({
        ...current,
        text: post.text,
        editedAt: post.editedAt,
      })),
  });
}
