import { getUnreadCounts } from "@/services/database/unread";
import { withViewer } from "@/lib/api/withViewer";

export const GET = withViewer(({ viewerId }) => getUnreadCounts(viewerId));
