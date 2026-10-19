import { toDataError } from "@/services/dataError";
import { replaceEntity } from "@/utils/replaceEntity";
import { type Fetcher, type QueryCache, type QueryEntry } from "@/types/query";

// Shared store for query results, keyed by string. Entries are replaced, never mutated,
// so they work as useSyncExternalStore snapshots.
export function createQueryCache(): QueryCache {
  const entries = new Map<string, QueryEntry>();
  const listeners = new Map<string, Set<() => void>>();
  const fetchers = new Map<string, Fetcher>();
  // Latest request per key; responses from older requests are dropped.
  const latest = new Map<string, number>();
  let requestCount = 0;

  function set(key: string, entry: QueryEntry): void {
    entries.set(key, entry);
    listeners.get(key)?.forEach((listener) => listener());
  }

  async function fetch(
    key: string,
    fetcher: Fetcher,
    background = false,
  ): Promise<void> {
    fetchers.set(key, fetcher);
    requestCount += 1;
    const id = requestCount;
    latest.set(key, id);
    const current = entries.get(key);
    const keepData = background && current?.status === "success";
    if (!keepData) set(key, { status: "loading" });
    try {
      const data = await fetcher();
      if (latest.get(key) === id) set(key, { status: "success", data });
    } catch (error) {
      if (latest.get(key) === id && !keepData) {
        set(key, { status: "error", error: toDataError(error) });
      }
    }
  }

  return {
    get: (key) => entries.get(key),
    subscribe: (key, listener) => {
      const keyListeners = listeners.get(key) ?? new Set();
      keyListeners.add(listener);
      listeners.set(key, keyListeners);
      return () => {
        keyListeners.delete(listener);
      };
    },
    ensure: (key, fetcher) => {
      fetchers.set(key, fetcher);
      const status = entries.get(key)?.status;
      if (status === "success" || status === "loading") return;
      void fetch(key, fetcher);
    },
    fetch,
    setData: (key, update) => {
      const entry = entries.get(key);
      if (entry?.status !== "success") return;
      set(key, { status: "success", data: update(entry.data as never) });
    },
    updateEntity: (id, update) => {
      entries.forEach((entry, key) => {
        if (entry.status !== "success") return;
        const data = replaceEntity(entry.data, id, update as never);
        if (data !== entry.data) set(key, { status: "success", data });
      });
    },
    invalidate: (match) => {
      fetchers.forEach((fetcher, key) => {
        if (match(key) && entries.has(key)) void fetch(key, fetcher, true);
      });
    },
    reset: () => {
      const keys = [...entries.keys()];
      entries.clear();
      latest.clear();
      keys.forEach((key) => {
        const fetcher = fetchers.get(key);
        if (listeners.get(key)?.size && fetcher) void fetch(key, fetcher);
      });
    },
  };
}
