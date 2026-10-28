import { type SegmentedOption } from "@/types/toggle";
import {
  type NetworkCondition,
  type NetworkProfile,
  type Scenario,
  type ScenarioId,
} from "@/types/simulation";

export const NETWORK_PROFILES: Record<NetworkCondition, NetworkProfile> = {
  normal: {
    label: "Normal",
    hint: "Responses arrive in under a second.",
    minLatencyMs: 300,
    maxLatencyMs: 800,
  },
  slow: {
    label: "Slow",
    hint: "Responses take 2+ seconds. Watch the pending states.",
    minLatencyMs: 2000,
    maxLatencyMs: 2600,
  },
  offline: {
    label: "Offline",
    hint: "Every request fails. Try liking or posting.",
    minLatencyMs: 300,
    maxLatencyMs: 800,
  },
  flaky: {
    label: "Flaky",
    hint: "Every other request fails, so you can see errors and retries.",
    minLatencyMs: 300,
    maxLatencyMs: 800,
  },
};

export const NETWORK_OPTIONS: SegmentedOption<NetworkCondition>[] = (
  Object.keys(NETWORK_PROFILES) as NetworkCondition[]
).map((network) => ({
  value: network,
  label: NETWORK_PROFILES[network].label,
}));

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  busy: {
    id: "busy",
    title: "Busy community",
    description:
      "A lively feed, conversations and notifications. The best place to start.",
    network: "normal",
    community: "busy",
  },
  fresh: {
    id: "fresh",
    title: "Fresh account",
    description:
      "You've just signed up. See the empty states and first-post flow.",
    network: "normal",
    community: "fresh",
  },
  flaky: {
    id: "flaky",
    title: "Flaky network",
    description:
      "Every other request fails, so you can see errors, retries and reverted actions.",
    network: "flaky",
    community: "busy",
  },
};

// Entries kept in the activity log; the rail card shows the most recent few.
export const ACTIVITY_LIMIT = 20;

export const NETWORK_ERROR_MESSAGE =
  "The simulated server didn't respond. This happens on the Offline and Flaky settings, just like a real connection drop.";
