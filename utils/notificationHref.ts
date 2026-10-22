import { postPath } from "@/utils/postPath";
import { type NotificationView } from "@/types/domain";

// Where a notification leads: its post, otherwise the person who sent it.
export function notificationHref(notification: NotificationView): string | null {
  if (notification.postId) return postPath(notification.postId);
  if (notification.actor) return `/u/${notification.actor.handle}`;
  return null;
}
