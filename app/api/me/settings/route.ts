import { getSettings, updateSettings } from "@/services/database/settings";
import { readJson, readSettingsUpdate } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";

export const GET = withViewer(({ viewerId }) => getSettings(viewerId));

export const PATCH = withViewer(async ({ request, viewerId }) =>
  updateSettings(viewerId, readSettingsUpdate(await readJson(request))),
);
