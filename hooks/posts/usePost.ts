"use client";

import { useQuery } from "@/hooks/data/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type PostView } from "@/types/domain";

export function usePost(postId: string) {
  return useQuery<PostView>(queryKeys.post(postId), (source) =>
    source.getPost(postId),
  );
}
