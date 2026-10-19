import { DataError } from "@/services/dataError";
import {
  NETWORK_ERROR_MESSAGE,
  NETWORK_PROFILES,
} from "@/lib/simulation/constants";
import { wait } from "@/utils/wait";
import {
  type ActivityLog,
  type Network,
  type NetworkCondition,
} from "@/types/simulation";

// Every request waits a realistic latency, then fails or runs `work` against the database.
export function createNetwork(
  getCondition: () => NetworkCondition,
  log: ActivityLog,
): Network {
  let requestCount = 0;

  function shouldFail(condition: NetworkCondition): boolean {
    requestCount += 1;
    if (condition === "offline") return true;
    // Flaky: every other request fails, starting with the first.
    return condition === "flaky" && requestCount % 2 === 1;
  }

  return {
    async request(work, messages) {
      const condition = getCondition();
      const profile = NETWORK_PROFILES[condition];
      const latency =
        profile.minLatencyMs +
        Math.random() * (profile.maxLatencyMs - profile.minLatencyMs);
      await wait(latency);
      try {
        if (shouldFail(condition))
          throw new DataError("network", NETWORK_ERROR_MESSAGE);
        const result = work();
        if (messages?.success) log.add(messages.success(result), "ok");
        return result;
      } catch (error) {
        if (messages?.failure) log.add(messages.failure, "error");
        throw error;
      }
    },
    resetFailures: () => {
      requestCount = 0;
    },
  };
}
