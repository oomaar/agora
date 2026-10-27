"use client";

import { ConversationRow } from "@/components/messages/ConversationRow";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useConversations } from "@/hooks/messages/useConversations";
import { CONVERSATION_SKELETON_COUNT } from "@/lib/messages/constants";
import { matchesConversation } from "@/utils/matchesConversation";
import { type ConversationListBodyProps } from "@/types/messages";

export function ConversationListBody({
  activeId,
  search,
  onNewMessage,
}: ConversationListBodyProps) {
  const conversations = useConversations();

  if (conversations.status === "loading") {
    return (
      <div role="status" aria-label="Loading conversations">
        {Array.from({ length: CONVERSATION_SKELETON_COUNT }, (_, index) => (
          <div key={index} className="flex gap-3 px-4 py-3">
            <Skeleton shape="circle" className="size-10 flex-none" />
            <div className="flex flex-1 flex-col gap-2 pt-1">
              <Skeleton className="w-[45%]" />
              <Skeleton className="w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.status === "error") {
    return (
      <ErrorState
        compact
        title="Couldn't load your conversations"
        description={conversations.error.message}
        actions={
          <Button variant="danger" size="sm" onClick={conversations.retry}>
            Try again
          </Button>
        }
        className="mx-4 my-2"
      />
    );
  }

  if (conversations.status === "empty") {
    return (
      <EmptyState
        compact
        icon="mail"
        title="No conversations yet"
        description="Start one with anyone on Agora."
        actions={
          <Button variant="secondary" size="sm" onClick={onNewMessage}>
            New message
          </Button>
        }
      />
    );
  }

  const matches = conversations.data.filter((conversation) =>
    matchesConversation(conversation, search),
  );
  if (!matches.length) {
    return (
      <p className="px-4 py-6 text-center text-body-sm text-ag-text-secondary">
        No conversations match “{search.trim()}”
      </p>
    );
  }

  return (
    <ul className="min-h-0 flex-1 overflow-y-auto">
      {matches.map((conversation) => (
        <ConversationRow
          key={conversation.id}
          conversation={conversation}
          active={conversation.id === activeId}
        />
      ))}
    </ul>
  );
}
