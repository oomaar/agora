import { sendMessage } from "@/services/database/conversations";
import { readJson, readNewMessage } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

// POST { text, attachments } — attachments are files the viewer uploaded for messages.
export const POST = withViewer<IdParams>(
  async ({ request, params, viewerId }) =>
    sendMessage(
      viewerId,
      params.id,
      readNewMessage(await readJson(request), viewerId),
    ),
);
