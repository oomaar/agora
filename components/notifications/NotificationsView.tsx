"use client";

import { useState } from "react";
import { NotificationList } from "@/components/notifications/NotificationList";
import { PageHeader } from "@/components/shell/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { useMarkNotificationsRead } from "@/hooks/notifications/useMarkNotificationsRead";
import { useUnreadCounts } from "@/hooks/shell/useUnreadCounts";
import { NOTIFICATION_TAB_ITEMS } from "@/lib/notifications/constants";
import { type NotificationFilter } from "@/types/dataSource";

export function NotificationsView() {
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const unread = useUnreadCounts();
  const markRead = useMarkNotificationsRead();
  const hasUnread = (unread.data?.notifications ?? 0) > 0;
  return (
    <>
      <PageHeader
        title="Notifications"
        action={
          <button
            type="button"
            onClick={() => markRead.run()}
            disabled={!hasUnread}
            className="cursor-pointer rounded-sm text-[13px] text-ag-text-secondary outline-none transition-colors hover:text-ag-text focus-visible:shadow-ag-focus-ring disabled:cursor-default disabled:opacity-50 disabled:hover:text-ag-text-secondary"
          >
            Mark all as read
          </button>
        }
      >
        <Tabs
          items={NOTIFICATION_TAB_ITEMS}
          value={filter}
          onChange={setFilter}
          label="Notifications"
        />
      </PageHeader>
      <div
        role="tabpanel"
        aria-label={
          NOTIFICATION_TAB_ITEMS.find((item) => item.id === filter)?.label
        }
      >
        <NotificationList filter={filter} />
      </div>
    </>
  );
}
