"use client";

import { useEffect, useEffectEvent } from "react";
import { useMarkConversationRead } from "@/hooks/messages/useMarkConversationRead";
import { type ConversationView } from "@/types/domain";

// Opening an unread conversation marks it read.
export function useMarkReadOnOpen(conversation: ConversationView | undefined) {
  const markRead = useMarkConversationRead();
  const unread = conversation?.unread ?? false;
  const mark = useEffectEvent(() => {
    if (conversation) void markRead.run(conversation);
  });
  useEffect(() => {
    if (unread) mark();
  }, [conversation?.id, unread]);
}
