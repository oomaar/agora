import { getConversationUpdates } from "@/services/database/conversations";
import { readSince } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

// Polled while the conversation is open: new messages since ?since=, and who's typing.
export const GET = withViewer<IdParams>(({ request, params, viewerId }) =>
  getConversationUpdates(viewerId, params.id, readSince(request)),
);
