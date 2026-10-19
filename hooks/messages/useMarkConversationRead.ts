"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { queryKeys } from "@/lib/data/queryKeys";
import { type UnreadCounts } from "@/types/dataSource";
import { type ConversationView } from "@/types/domain";

// Optimistic and silent: opening a conversation clears its unread state.
export function useMarkConversationRead() {
  return useMutation<ConversationView, UnreadCounts>({
    mutate: (source, conversation) =>
      source.markConversationRead(conversation.id),
    onMutate: (cache, conversation) => {
      const update = (unread: boolean) =>
        cache.updateEntity<ConversationView>(conversation.id, (current) => ({
          ...current,
          unread,
        }));
      update(false);
      return () => update(conversation.unread);
    },
    onSuccess: (cache, counts) =>
      cache.setData(queryKeys.unreadCounts(), () => counts),
  });
}
