"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type NotificationFilter } from "@/types/dataSource";
import { type NotificationView } from "@/types/domain";

export function useNotifications(filter: NotificationFilter) {
  return useQuery<NotificationView[]>(
    queryKeys.notifications(filter),
    (source) => source.getNotifications(filter),
  );
}
