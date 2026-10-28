import { generateSeed } from "@/services/seed/generateSeed";
import { createActivityLog } from "@/services/simulated/createActivityLog";
import { createNetwork } from "@/services/simulated/createNetwork";
import { createSimulatedSource } from "@/services/simulated/createSimulatedSource";
import { NETWORK_PROFILES, SCENARIOS } from "@/lib/simulation/constants";
import {
  type DataPreset,
  type ScenarioId,
  type Simulation,
  type SimulationControls,
  type SimulationState,
} from "@/types/simulation";

// An in-browser backend: seeded database, simulated network and an activity log.
export function createSimulation(
  preset: DataPreset,
  scenarioId = preset.scenario,
): Simulation {
  let scenario = SCENARIOS[scenarioId];
  let network = scenario.network;
  const listeners = new Set<() => void>();

  const log = createActivityLog(() => {
    state = { ...state, activity: log.getEntries() };
    listeners.forEach((listener) => listener());
  });
  let state: SimulationState = {
    network,
    scenario: scenario.id,
    activity: log.getEntries(),
  };
  // The server can't read ?scenario=, so it renders the preset's default; the browser
  // hydrates from the same snapshot, then switches to the real state.
  const serverState: SimulationState = {
    network: SCENARIOS[preset.scenario].network,
    scenario: preset.scenario,
    activity: [],
  };

  const seed = () =>
    generateSeed({
      content: preset.content,
      scenario,
      seed: preset.seed,
      now: Date.now(),
    });
  const welcome = () =>
    log.add(`Signed in as ${preset.content.self.name}`, "ok");

  let db = seed();
  const transport = createNetwork(() => network, log);

  const controls: SimulationControls = {
    getState: () => state,
    getServerState: () => serverState,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setNetwork: (next) => {
      if (next === network) return;
      network = next;
      state = { ...state, network };
      log.add(
        `Network set to ${NETWORK_PROFILES[next].label.toLowerCase()}`,
        "info",
      );
    },
    reset: (next?: ScenarioId) => {
      scenario = SCENARIOS[next ?? scenario.id];
      network = scenario.network;
      state = { ...state, network, scenario: scenario.id };
      transport.resetFailures();
      db = seed();
      log.clear();
      welcome();
    },
  };

  welcome();
  return { source: createSimulatedSource(() => db, transport), controls };
}
