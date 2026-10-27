import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { LogoMark } from "@/components/ui/LogoMark";
import {
  AGORA_SENDER,
  NOTIFICATION_KIND_CLASSES,
  NOTIFICATION_KIND_LABELS,
} from "@/lib/notifications/constants";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { notificationHref } from "@/utils/notificationHref";
import { cn } from "@/utils/cn";
import { type NotificationItemProps } from "@/types/notifications";

export function NotificationItem({ notification }: NotificationItemProps) {
  const { actor, kind, read } = notification;
  const href = notificationHref(notification);
  const body = (
    <>
      <span aria-hidden="true" className="w-2 flex-none pt-3.5">
        {!read && <span className="block size-2 rounded-full bg-ag-accent" />}
      </span>
      {actor ? (
        <Avatar
          name={actor.name}
          handle={actor.handle}
          src={actor.avatarUrl}
          size="sm"
        />
      ) : (
        <LogoMark size={36} />
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[14.5px] leading-[1.45]">
          {!read && <span className="sr-only">Unread: </span>}
          <b className="font-semibold">{actor?.name ?? AGORA_SENDER}</b>{" "}
          {notification.text}
        </span>
        {notification.quote && (
          <span className="wrap-break-word border-l-2 border-ag-border pl-2.5 text-[13.5px] text-ag-text-secondary">
            {notification.quote}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-[12.5px] text-ag-text-secondary">
          <span
            className={cn("font-semibold", NOTIFICATION_KIND_CLASSES[kind])}
          >
            {NOTIFICATION_KIND_LABELS[kind]}
          </span>
          ·
          <time dateTime={notification.createdAt}>
            {formatRelativeTime(notification.createdAt)}
          </time>
        </span>
      </span>
    </>
  );
  const className = cn(
    "flex gap-3.5 border-b border-ag-border-subtle px-5 py-4",
    !read && "bg-ag-unread",
  );
  return (
    <li>
      {href ? (
        <Link
          href={href}
          className={cn(
            className,
            "outline-none transition-colors hover:bg-ag-hover focus-visible:shadow-ag-focus-ring",
          )}
        >
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}
