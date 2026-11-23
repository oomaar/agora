import { setTyping } from "@/services/database/conversations";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

// PUT while typing (repeated every few seconds), DELETE when the draft is cleared.
export const PUT = withViewer<IdParams>(({ params, viewerId }) =>
  setTyping(viewerId, params.id, true),
);

export const DELETE = withViewer<IdParams>(({ params, viewerId }) =>
  setTyping(viewerId, params.id, false),
);
