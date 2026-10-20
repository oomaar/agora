import { type ReactNode } from "react";
import { type DataError } from "@/services/dataError";
import { type DataSource } from "@/types/dataSource";
import {
  type DataPresetId,
  type ScenarioId,
  type SimulationControls,
  type SimulationState,
  type NetworkCondition,
} from "@/types/simulation";

export type QueryEntry =
  | { status: "loading" }
  | { status: "error"; error: DataError }
  | { status: "success"; data: unknown };

export type Fetcher = () => Promise<unknown>;

export type QueryCache = {
  get: (key: string) => QueryEntry | undefined;
  subscribe: (key: string, listener: () => void) => () => void;
  // Loads unless the key is cached or already loading.
  ensure: (key: string, fetcher: Fetcher) => void;
  // Background refetches keep the current data and never surface an error.
  fetch: (key: string, fetcher: Fetcher, background?: boolean) => Promise<void>;
  setData: <T>(key: string, update: (data: T) => T) => void;
  // Patches the entity with this id in every cached query that contains it.
  updateEntity: <E extends { id: string }>(
    id: string,
    update: (entity: E) => E,
  ) => void;
  invalidate: (match: (key: string) => boolean) => void;
  // Drops everything and reloads the queries still on screen.
  reset: () => void;
};

export type QueryStatus = "loading" | "error" | "empty" | "success";

export type QueryState<T> =
  | { status: "loading"; data: undefined; error: null }
  | { status: "error"; data: undefined; error: DataError }
  | { status: "empty"; data: T; error: null }
  | { status: "success"; data: T; error: null };

export type QueryResult<T> = QueryState<T> & {
  retry: () => void;
};

export type QueryOptions<T> = {
  enabled?: boolean;
  isEmpty?: (data: T) => boolean;
};

export type MutationStatus = "idle" | "pending" | "error" | "success";

export type MutationOptions<TVariables, TResult> = {
  mutate: (source: DataSource, variables: TVariables) => Promise<TResult>;
  // Applies an optimistic update and returns how to undo it.
  onMutate?: (cache: QueryCache, variables: TVariables) => (() => void) | void;
  onSuccess?: (
    cache: QueryCache,
    result: TResult,
    variables: TVariables,
  ) => void;
  onError?: (error: DataError, variables: TVariables) => void;
};

export type MutationResult<TVariables, TResult> = {
  status: MutationStatus;
  error: DataError | null;
  run: (variables: TVariables) => Promise<TResult | undefined>;
  // Runs the last variables again.
  retry: () => void;
  reset: () => void;
};

export type DataContextValue = {
  source: DataSource;
  cache: QueryCache;
  // Only the demo has a simulated backend to control.
  simulation: SimulationControls | null;
};

export type DataProviderProps = {
  preset: DataPresetId;
  // Demo only: the scenario the simulation starts from.
  scenario?: ScenarioId;
  children: ReactNode;
};

export type UseSimulationResult = SimulationState & {
  setNetwork: (network: NetworkCondition) => void;
  reset: (scenario?: ScenarioId) => void;
};

export type AddCommentVariables = {
  tempId: string;
  text: string;
};

export type SendMessageVariables = {
  tempId: string;
  text: string;
};
