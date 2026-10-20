import { markConversationRead } from "@/services/database/conversations";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

export const POST = withViewer<IdParams>(({ params, viewerId }) =>
  markConversationRead(viewerId, params.id),
);
