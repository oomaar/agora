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
  const { fromSelf, status } = message;
  const time = formatMessageTime(message.createdAt);
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
      <p
        className={cn(
          "max-w-[80%] whitespace-pre-line wrap-break-word rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-[1.45] sm:max-w-[62%]",
          fromSelf
            ? "bg-ag-accent text-ag-on-accent"
            : "bg-ag-raised text-ag-text",
          status === "sending" && "opacity-60",
        )}
      >
        {message.text}
      </p>
      {status === "sending" && (
        <span className="text-[11.5px] text-ag-text-secondary">Sending…</span>
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
