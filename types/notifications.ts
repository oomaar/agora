import { type NotificationView } from "@/types/domain";
import { type NotificationFilter } from "@/types/dataSource";

export type NotificationItemProps = {
  notification: NotificationView;
};

export type NotificationListProps = {
  filter: NotificationFilter;
};

export type NotificationEmptyCopy = {
  title: string;
  description: string;
};
