import { getNotifications } from "@/services/database/notifications";
import { readParam } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { NOTIFICATION_FILTERS } from "@/lib/api/constants";

export const GET = withViewer(({ request, viewerId }) =>
  getNotifications(viewerId, readParam(request, "filter", NOTIFICATION_FILTERS)),
);
