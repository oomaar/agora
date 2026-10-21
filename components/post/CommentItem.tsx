import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { cn } from "@/utils/cn";
import { type CommentItemProps } from "@/types/postDetail";

export function CommentItem({ comment, onRetry }: CommentItemProps) {
  const { author, status } = comment;
  return (
    <li
      aria-busy={status === "sending" || undefined}
      className={cn(
        "flex gap-3 border-b border-ag-border-subtle px-5 py-3.5",
        status === "sending" && "opacity-60",
      )}
    >
      <Avatar name={author.name} handle={author.handle} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.25">
        <p className="flex min-w-0 items-baseline gap-1.5 text-[13.5px]">
          <Link
            href={`/u/${author.handle}`}
            className="truncate rounded-sm font-semibold outline-none hover:underline focus-visible:shadow-ag-focus-ring"
          >
            {author.name}
          </Link>
          {status === "sending" && (
            <span className="text-ag-text-secondary">Sending…</span>
          )}
          {status === "failed" && (
            <span className="text-ag-danger">Not sent</span>
          )}
          {status === "sent" && (
            <time
              dateTime={comment.createdAt}
              className="flex-none text-ag-text-secondary"
            >
              · {formatRelativeTime(comment.createdAt)}
            </time>
          )}
        </p>
        <p className="whitespace-pre-line wrap-break-word text-[14.5px] leading-normal">
          {comment.text}
        </p>
        {status === "failed" && (
          <p
            role="alert"
            className="flex items-center gap-2.5 text-[13px] text-ag-danger"
          >
            Couldn&apos;t send this comment.
            <button
              type="button"
              onClick={() => onRetry(comment)}
              className="cursor-pointer rounded-sm font-semibold underline outline-none focus-visible:shadow-ag-focus-ring"
            >
              Retry
            </button>
          </p>
        )}
      </div>
    </li>
  );
}
