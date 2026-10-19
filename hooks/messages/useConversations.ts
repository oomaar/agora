"use client";

import { useQuery } from "@/hooks/data/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type ConversationView } from "@/types/domain";

export function useConversations() {
  return useQuery<ConversationView[]>(queryKeys.conversations(), (source) =>
    source.getConversations(),
  );
}
