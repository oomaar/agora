"use client";

import { NotificationItem } from "@/components/notifications/NotificationItem";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { NOTIFICATION_EMPTY_COPY } from "@/lib/notifications/constants";
import { FEED_SKELETON_COUNT } from "@/lib/posts/constants";
import { type NotificationListProps } from "@/types/notifications";

export function NotificationList({ filter }: NotificationListProps) {
  const notifications = useNotifications(filter);

  if (notifications.status === "loading") {
    return (
      <div role="status" aria-label="Loading notifications">
        {Array.from({ length: FEED_SKELETON_COUNT }, (_, index) => (
          <PostSkeleton key={index} withMedia={false} />
        ))}
      </div>
    );
  }

  if (notifications.status === "error") {
    return (
      <ErrorState
        title="Couldn't load your notifications"
        description={notifications.error.message}
        actions={
          <Button variant="danger" onClick={notifications.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  if (notifications.status === "empty") {
    return <EmptyState icon="bell" {...NOTIFICATION_EMPTY_COPY[filter]} />;
  }

  return (
    <ul>
      {notifications.data.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ul>
  );
}
