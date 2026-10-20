import { markNotificationsRead } from "@/services/database/notifications";
import { withViewer } from "@/lib/api/withViewer";

export const POST = withViewer(({ viewerId }) =>
  markNotificationsRead(viewerId),
);
