"use client";

import { useRouter } from "next/navigation";
import { ChatComposer } from "@/components/messages/ChatComposer";
import { ChatHeader } from "@/components/messages/ChatHeader";
import { ChatMessages } from "@/components/messages/ChatMessages";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useConversation } from "@/hooks/messages/useConversation";
import { useMarkReadOnOpen } from "@/hooks/messages/useMarkReadOnOpen";
import { useSendMessage } from "@/hooks/messages/useSendMessage";
import { BUBBLE_SKELETONS, MESSAGES_PATH } from "@/lib/messages/constants";
import { cn } from "@/utils/cn";
import { type ChatThreadProps } from "@/types/messages";

export function ChatThread({ conversationId }: ChatThreadProps) {
  const router = useRouter();
  const thread = useConversation(conversationId);
  const message = useSendMessage(conversationId);
  useMarkReadOnOpen(thread.data?.conversation);

  if (thread.status === "loading") {
    return (
      <div
        role="status"
        aria-label="Loading conversation"
        className="flex flex-1 flex-col"
      >
        <div className="flex h-15.5 flex-none items-center gap-3 border-b border-ag-border-subtle px-5">
          <Skeleton shape="circle" className="size-9 flex-none" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="w-32" />
            <Skeleton className="w-20" />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5">
          {BUBBLE_SKELETONS.map((className) => (
            <span
              key={className}
              aria-hidden="true"
              className={cn(
                "h-10 rounded-2xl bg-ag-skeleton motion-safe:animate-pulse",
                className,
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  if (thread.status === "error") {
    if (thread.error.code === "not-found") {
      return (
        <EmptyState
          icon="mail"
          title="This conversation doesn't exist"
          description="It may have been removed, or the link is wrong."
          actions={
            <Button
              variant="secondary"
              onClick={() => router.push(MESSAGES_PATH)}
            >
              Back to Messages
            </Button>
          }
          className="m-auto"
        />
      );
    }
    return (
      <ErrorState
        title="Couldn't load this conversation"
        description={thread.error.message}
        actions={
          <Button variant="danger" onClick={thread.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  const { conversation, messages } = thread.data;
  return (
    <>
      <ChatHeader conversation={conversation} messages={messages} />
      <ChatMessages
        conversation={conversation}
        messages={messages}
        onRetry={message.retry}
      />
      <ChatComposer onSend={(text) => void message.send(text)} />
    </>
  );
}
