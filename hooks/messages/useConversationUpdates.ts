"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { useData } from "@/hooks/data/useData";
import { useMarkConversationRead } from "@/hooks/messages/useMarkConversationRead";
import { queryKeys } from "@/lib/data/queryKeys";
import { CHAT_POLL_MS } from "@/lib/messages/constants";
import { withLastMessage } from "@/utils/withLastMessage";
import {
  type ConversationThread,
  type ConversationUpdates,
  type ConversationView,
} from "@/types/domain";

type Typing = {
  conversationId: string;
  ids: string[];
};

// While the conversation is open and the tab is visible, checks every couple of
// seconds for new messages from the others (added to the thread, which is then
// marked read) and returns who's typing. Failed checks are skipped quietly.
export function useConversationUpdates(
  conversationId: string,
  ready: boolean,
): string[] {
  const { source, cache } = useData();
  const markRead = useMarkConversationRead();
  const [typing, setTyping] = useState<Typing | null>(null);
  const key = queryKeys.conversation(conversationId);

  const readThread = (): ConversationThread | null => {
    const entry = cache.get(key);
    return entry?.status === "success"
      ? (entry.data as ConversationThread)
      : null;
  };

  const check = useEffectEvent(() => {
    const thread = readThread();
    if (!thread) return null;
    const since = thread.messages
      .filter((message) => !message.fromSelf)
      .reduce<string | null>(
        (latest, message) =>
          latest && latest > message.createdAt ? latest : message.createdAt,
        null,
      );
    return source.getConversationUpdates(conversationId, since);
  });

  const apply = useEffectEvent((updates: ConversationUpdates) => {
    setTyping({ conversationId, ids: updates.typingIds });
    const thread = readThread();
    if (!thread) return;
    const known = new Set(thread.messages.map((message) => message.id));
    const fresh = updates.messages.filter((message) => !known.has(message.id));
    const latest = fresh.at(-1);
    if (!latest) return;
    cache.setData<ConversationThread>(key, (current) => ({
      ...current,
      messages: [...current.messages, ...fresh],
    }));
    cache.setData<ConversationView[]>(queryKeys.conversations(), (list) =>
      withLastMessage(list, latest, false),
    );
    // You're looking at it, so it's read.
    void markRead.run({ ...thread.conversation, unread: true });
  });

  useEffect(() => {
    if (!ready) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const loop = async () => {
      if (document.visibilityState === "visible") {
        try {
          const updates = await check();
          if (updates && !stopped) apply(updates);
        } catch {}
      }
      if (!stopped) timer = setTimeout(loop, CHAT_POLL_MS);
    };
    timer = setTimeout(loop, CHAT_POLL_MS);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [conversationId, ready]);

  return typing?.conversationId === conversationId ? typing.ids : [];
}
