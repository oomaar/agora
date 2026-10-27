"use client";

import { Fragment } from "react";
import { DaySeparator } from "@/components/messages/DaySeparator";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { EmptyState } from "@/components/ui/EmptyState";
import { useScrollToEnd } from "@/hooks/messages/useScrollToEnd";
import { conversationTitle } from "@/utils/conversationTitle";
import { groupMessagesByDay } from "@/utils/groupMessagesByDay";
import { type ChatMessagesProps } from "@/types/messages";

export function ChatMessages({
  conversation,
  messages,
  onRetry,
}: ChatMessagesProps) {
  const ref = useScrollToEnd<HTMLDivElement>(messages.length);
  const latest = messages.at(-1);
  const isGroup = conversation.name !== null;
  return (
    <div
      ref={ref}
      role="log"
      aria-label="Messages"
      className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-5"
    >
      {messages.length ? (
        groupMessagesByDay(messages).map((day) => (
          <Fragment key={day.key}>
            <DaySeparator label={day.label} />
            {day.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                sender={
                  isGroup && !message.fromSelf
                    ? (conversation.members.find(
                        (member) => member.id === message.senderId,
                      ) ?? null)
                    : null
                }
                delivered={
                  message === latest &&
                  message.fromSelf &&
                  message.status === "sent"
                }
                onRetry={onRetry}
              />
            ))}
          </Fragment>
        ))
      ) : (
        <EmptyState
          compact
          icon="mail"
          title={`Start your conversation with ${conversationTitle(conversation)}`}
          description="Messages you send show up here."
          className="m-auto"
        />
      )}
    </div>
  );
}
