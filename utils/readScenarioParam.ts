import { SCENARIO_PARAM } from "@/lib/public/constants";
import { SCENARIOS } from "@/lib/simulation/constants";
import { type ScenarioId } from "@/types/simulation";

// "?scenario=flaky" → "flaky"; unknown or missing → undefined.
export function readScenarioParam(search: string): ScenarioId | undefined {
  const value = new URLSearchParams(search).get(SCENARIO_PARAM);
  return value && value in SCENARIOS ? (value as ScenarioId) : undefined;
}
