import { sendMessage } from "@/services/database/conversations";
import { readJson, readString } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { MESSAGE_MAX_LENGTH } from "@/lib/data/constants";
import { requireText } from "@/utils/requireText";
import { type IdParams } from "@/types/api";

export const POST = withViewer<IdParams>(async ({ request, params, viewerId }) => {
  const text = readString(await readJson(request), "text");
  return sendMessage(
    viewerId,
    params.id,
    requireText(text, MESSAGE_MAX_LENGTH, "Your message"),
  );
});
