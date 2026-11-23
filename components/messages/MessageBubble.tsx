import { MessageAttachments } from "@/components/messages/MessageAttachments";
import { firstName } from "@/utils/firstName";
import { formatMessageTime } from "@/utils/formatMessageTime";
import { cn } from "@/utils/cn";
import { type MessageBubbleProps } from "@/types/messages";

export function MessageBubble({
  message,
  sender,
  delivered,
  onRetry,
}: MessageBubbleProps) {
  const { fromSelf, status, attachments, progress } = message;
  const time = formatMessageTime(message.createdAt);
  const hasAttachments = attachments.length > 0;
  return (
    <div
      aria-busy={status === "sending" || undefined}
      className={cn(
        "flex flex-col gap-0.75",
        fromSelf ? "items-end" : "items-start",
      )}
    >
      {sender && (
        <span className="px-1 text-[12px] text-ag-text-secondary">
          {firstName(sender.name)}
        </span>
      )}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1 rounded-2xl text-[14.5px] leading-[1.45] sm:max-w-[62%]",
          fromSelf
            ? "bg-ag-accent text-ag-on-accent"
            : "bg-ag-raised text-ag-text",
          hasAttachments && "p-1",
          status === "sending" && "opacity-60",
        )}
      >
        {hasAttachments && (
          <MessageAttachments attachments={attachments} fromSelf={fromSelf} />
        )}
        {message.text && (
          <p
            className={cn(
              "whitespace-pre-line wrap-break-word",
              hasAttachments ? "px-2.5 pb-1.5 pt-0.5" : "px-3.5 py-2.5",
            )}
          >
            {message.text}
          </p>
        )}
      </div>
      {status === "sending" && (
        <span className="text-[11.5px] text-ag-text-secondary">
          {progress !== undefined && progress < 100
            ? `Sending… ${progress}%`
            : "Sending…"}
        </span>
      )}
      {status === "failed" && (
        <span
          role="alert"
          className="flex items-center gap-1.5 text-[11.5px] text-ag-danger"
        >
          Not delivered ·
          <button
            type="button"
            onClick={() => onRetry(message)}
            className="cursor-pointer rounded-sm font-semibold underline outline-none focus-visible:shadow-ag-focus-ring"
          >
            Retry
          </button>
        </span>
      )}
      {status === "sent" && (
        <time
          dateTime={message.createdAt}
          className="text-[11.5px] text-ag-text-secondary"
        >
          {delivered ? `Delivered · ${time}` : time}
        </time>
      )}
    </div>
  );
}
