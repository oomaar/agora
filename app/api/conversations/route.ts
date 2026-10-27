import {
  getConversations,
  startConversation,
} from "@/services/database/conversations";
import { readJson, readString } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";

export const GET = withViewer(({ viewerId }) => getConversations(viewerId));

export const POST = withViewer(async ({ request, viewerId }) =>
  startConversation(viewerId, readString(await readJson(request), "userId")),
);
