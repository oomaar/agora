"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { useToast } from "@/hooks/ui/useToast";
import { queryKeys } from "@/lib/data/queryKeys";
import { type NotificationFilter, type UnreadCounts } from "@/types/dataSource";
import { type NotificationView } from "@/types/domain";

const FILTERS: NotificationFilter[] = ["all", "mentions"];

// Optimistic: rows lose their unread styling and the counter clears at once.
export function useMarkNotificationsRead() {
  const toast = useToast();
  return useMutation<void, UnreadCounts>({
    mutate: (source) => source.markNotificationsRead(),
    onMutate: (cache) => {
      const keys = [
        ...FILTERS.map(queryKeys.notifications),
        queryKeys.unreadCounts(),
      ];
      const previous = keys.map((key) => cache.get(key));
      FILTERS.forEach((filter) =>
        cache.setData<NotificationView[]>(
          queryKeys.notifications(filter),
          (notifications) =>
            notifications.map((notification) => ({
              ...notification,
              read: true,
            })),
        ),
      );
      cache.setData<UnreadCounts>(queryKeys.unreadCounts(), (counts) => ({
        ...counts,
        notifications: 0,
      }));
      return () =>
        keys.forEach((key, index) => {
          const entry = previous[index];
          if (entry?.status === "success") cache.setData(key, () => entry.data);
        });
    },
    onSuccess: (cache, counts) =>
      cache.setData(queryKeys.unreadCounts(), () => counts),
    onError: () =>
      toast.error("Couldn't mark notifications as read. Try again."),
  });
}
