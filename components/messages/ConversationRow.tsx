import Link from "next/link";
import { ConversationAvatar } from "@/components/messages/ConversationAvatar";
import { conversationPath } from "@/utils/conversationPath";
import { conversationPreview } from "@/utils/conversationPreview";
import { conversationTitle } from "@/utils/conversationTitle";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { cn } from "@/utils/cn";
import { type ConversationRowProps } from "@/types/messages";

export function ConversationRow({
  conversation,
  active,
}: ConversationRowProps) {
  const { lastMessage, unread } = conversation;
  return (
    <li>
      <Link
        href={conversationPath(conversation.id)}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex gap-3 border-l-2 px-4 py-3 outline-none transition-colors hover:bg-ag-hover focus-visible:shadow-ag-focus-ring",
          active ? "border-ag-accent bg-ag-hover" : "border-transparent",
        )}
      >
        <ConversationAvatar conversation={conversation} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.75">
          <span className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[14px] font-semibold">
              {conversationTitle(conversation)}
            </span>
            {lastMessage && (
              <time
                dateTime={lastMessage.createdAt}
                className="flex-none text-[12px] text-ag-text-secondary"
              >
                {formatRelativeTime(lastMessage.createdAt)}
              </time>
            )}
          </span>
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[13px]",
                unread ? "font-medium text-ag-text" : "text-ag-text-secondary",
              )}
            >
              {conversationPreview(conversation)}
            </span>
            {unread && (
              <span className="size-2 flex-none rounded-full bg-ag-accent">
                <span className="sr-only">Unread</span>
              </span>
            )}
          </span>
        </span>
      </Link>
    </li>
  );
}
