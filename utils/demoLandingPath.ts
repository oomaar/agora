import { DEMO_PATH } from "@/lib/public/constants";
import { RETURN_PATH_PARAM } from "@/lib/demo/constants";

// "/settings/demo" → "/demo?from=%2Fsettings%2Fdemo"
export function demoLandingPath(returnPath: string): string {
  return `${DEMO_PATH}?${new URLSearchParams({ [RETURN_PATH_PARAM]: returnPath })}`;
}
