"use client";

import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useMutation } from "@/hooks/data/useMutation";
import { queryKeys } from "@/lib/data/queryKeys";
import { createTempId } from "@/utils/createTempId";
import { type SendMessageVariables } from "@/types/query";
import {
  type ConversationThread,
  type ConversationView,
  type MessageView,
} from "@/types/domain";

function byLatestMessage(a: ConversationView, b: ConversationView): number {
  return (b.lastMessage?.createdAt ?? "").localeCompare(
    a.lastMessage?.createdAt ?? "",
  );
}

// Optimistic: the message shows as Sending… straight away, then Delivered or failed.
// A failed message stays in the thread so it can be retried.
export function useSendMessage(conversationId: string) {
  const { data: self } = useCurrentUser();
  const key = queryKeys.conversation(conversationId);
  const mutation = useMutation<SendMessageVariables, MessageView>({
    mutate: (source, { text }) => source.sendMessage(conversationId, text),
    onMutate: (cache, { tempId, text }) => {
      cache.setData<ConversationThread>(key, (thread) => ({
        ...thread,
        messages: thread.messages.some((message) => message.id === tempId)
          ? thread.messages.map((message) =>
              message.id === tempId
                ? { ...message, status: "sending" }
                : message,
            )
          : [
              ...thread.messages,
              {
                id: tempId,
                conversationId,
                senderId: self?.id ?? "",
                text,
                createdAt: new Date().toISOString(),
                fromSelf: true,
                status: "sending",
              },
            ],
      }));
      return () =>
        cache.updateEntity<MessageView>(tempId, (message) => ({
          ...message,
          status: "failed",
        }));
    },
    onSuccess: (cache, message, { tempId }) => {
      cache.setData<ConversationThread>(key, (thread) => ({
        ...thread,
        messages: thread.messages.some((item) => item.id === tempId)
          ? thread.messages.map((item) => (item.id === tempId ? message : item))
          : [...thread.messages, message],
      }));
      const lastMessage = {
        id: message.id,
        conversationId,
        senderId: message.senderId,
        text: message.text,
        createdAt: message.createdAt,
      };
      cache.setData<ConversationView[]>(
        queryKeys.conversations(),
        (conversations) =>
          conversations
            .map((conversation) =>
              conversation.id === conversationId
                ? { ...conversation, lastMessage, unread: false }
                : conversation,
            )
            .sort(byLatestMessage),
      );
    },
  });
  return {
    status: mutation.status,
    error: mutation.error,
    send: (text: string) => mutation.run({ tempId: createTempId(), text }),
    retry: (message: MessageView) =>
      mutation.run({ tempId: message.id, text: message.text }),
  };
}
