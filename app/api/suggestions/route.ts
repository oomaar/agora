import { getSuggestedPeople } from "@/services/database/users";
import { readLimit } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { SUGGESTION_LIMIT_MAX } from "@/lib/api/constants";

export const GET = withViewer(({ request, viewerId }) =>
  getSuggestedPeople(viewerId, readLimit(request, "limit", SUGGESTION_LIMIT_MAX)),
);
