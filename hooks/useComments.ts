"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type CommentView } from "@/types/domain";

export function useComments(postId: string) {
  return useQuery<CommentView[]>(queryKeys.comments(postId), (source) =>
    source.getComments(postId),
  );
}
