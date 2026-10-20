import { getConversation } from "@/services/database/conversations";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

export const GET = withViewer<IdParams>(({ params, viewerId }) =>
  getConversation(viewerId, params.id),
);
