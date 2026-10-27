"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConversationAvatar } from "@/components/messages/ConversationAvatar";
import { IconButton } from "@/components/ui/IconButton";
import { MESSAGES_PATH } from "@/lib/messages/constants";
import { conversationTitle } from "@/utils/conversationTitle";
import { getActivityStatus } from "@/utils/getActivityStatus";
import { cn } from "@/utils/cn";
import { type ChatHeaderProps } from "@/types/messages";

export function ChatHeader({ conversation, messages }: ChatHeaderProps) {
  const router = useRouter();
  const status = getActivityStatus(conversation, messages);
  const person = conversation.name ? null : conversation.members[0];
  return (
    <header className="flex h-15.5 flex-none items-center gap-3 border-b border-ag-border-subtle px-5">
      {/* Phones show the list and the thread one at a time. */}
      <span className="sm:hidden">
        <IconButton
          icon="arrowLeft"
          label="Back to conversations"
          variant="outline"
          size="sm"
          onClick={() => router.push(MESSAGES_PATH)}
        />
      </span>
      <ConversationAvatar conversation={conversation} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="truncate text-[14.5px] font-semibold">
          {conversationTitle(conversation)}
        </h2>
        <span
          className={cn(
            "truncate text-[12.5px]",
            status.active ? "text-ag-success" : "text-ag-text-secondary",
          )}
        >
          {status.label}
        </span>
      </div>
      {person && (
        <Link
          href={`/u/${person.handle}`}
          className="flex-none rounded-sm text-[13px] text-ag-text-secondary outline-none transition-colors hover:text-ag-text focus-visible:shadow-ag-focus-ring"
        >
          View profile
        </Link>
      )}
    </header>
  );
}
