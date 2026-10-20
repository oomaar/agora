import { getUserByHandle } from "@/services/database/users";
import { withViewer } from "@/lib/api/withViewer";
import { type HandleParams } from "@/types/api";

export const GET = withViewer<HandleParams>(({ params, viewerId }) =>
  getUserByHandle(viewerId, params.handle),
);
