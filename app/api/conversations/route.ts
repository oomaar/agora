import { getConversations } from "@/services/database/conversations";
import { withViewer } from "@/lib/api/withViewer";

export const GET = withViewer(({ viewerId }) => getConversations(viewerId));
