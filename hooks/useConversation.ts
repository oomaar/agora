"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type ConversationThread } from "@/types/domain";

export function useConversation(conversationId: string) {
  return useQuery<ConversationThread>(
    queryKeys.conversation(conversationId),
    (source) => source.getConversation(conversationId),
    { isEmpty: (thread) => !thread.messages.length },
  );
}
