import { DEMO_ENTRY_PATH, SCENARIO_PARAM } from "@/lib/public/constants";
import { RETURN_PATH_PARAM } from "@/lib/demo/constants";
import { type ScenarioId } from "@/types/simulation";

// "/demo/home?scenario=flaky&from=%2F"
export function demoEntryPath(
  scenario: ScenarioId,
  returnPath: string,
): string {
  const params = new URLSearchParams({
    [SCENARIO_PARAM]: scenario,
    [RETURN_PATH_PARAM]: returnPath,
  });
  return `${DEMO_ENTRY_PATH}?${params}`;
}
