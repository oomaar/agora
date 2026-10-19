"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type ProfileTab } from "@/types/dataSource";
import { type PostView } from "@/types/domain";

export function useUserPosts(handle: string, tab: ProfileTab) {
  return useQuery<PostView[]>(queryKeys.userPosts(handle, tab), (source) =>
    source.getUserPosts(handle, tab),
  );
}
