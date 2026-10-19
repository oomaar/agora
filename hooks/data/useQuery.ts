"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useSyncExternalStore,
} from "react";
import { useData } from "@/hooks/data/useData";
import { type DataSource } from "@/types/dataSource";
import {
  type QueryOptions,
  type QueryResult,
  type QueryState,
} from "@/types/query";

function isEmptyArray(data: unknown): boolean {
  return Array.isArray(data) && data.length === 0;
}

// Reads `key` from the shared cache, loading it on mount when it isn't cached yet.
// Renders as loading on the server; data is only fetched in the browser.
export function useQuery<T>(
  key: string,
  fetcher: (source: DataSource) => Promise<T>,
  { enabled = true, isEmpty = isEmptyArray }: QueryOptions<T> = {},
): QueryResult<T> {
  const { source, cache } = useData();
  const entry = useSyncExternalStore(
    useCallback((listener) => cache.subscribe(key, listener), [cache, key]),
    () => cache.get(key),
    () => undefined,
  );

  const load = useEffectEvent(() => cache.ensure(key, () => fetcher(source)));
  useEffect(() => {
    if (enabled) load();
  }, [key, enabled]);

  const retry = () => void cache.fetch(key, () => fetcher(source));

  let state: QueryState<T>;
  if (!entry || entry.status === "loading") {
    state = { status: "loading", data: undefined, error: null };
  } else if (entry.status === "error") {
    state = { status: "error", data: undefined, error: entry.error };
  } else {
    const data = entry.data as T;
    state = { status: isEmpty(data) ? "empty" : "success", data, error: null };
  }
  return { ...state, retry };
}
