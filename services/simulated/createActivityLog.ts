import { ACTIVITY_LIMIT } from "@/lib/simulation/constants";
import { type ActivityEntry, type ActivityLog } from "@/types/simulation";

// Plain-language record of what the simulated server did ("Like saved on Dev's post").
export function createActivityLog(onChange: () => void): ActivityLog {
  let entries: ActivityEntry[] = [];
  let nextId = 0;
  return {
    getEntries: () => entries,
    add: (text, tone) => {
      nextId += 1;
      const entry = { id: nextId, text, tone, time: new Date().toISOString() };
      entries = [entry, ...entries].slice(0, ACTIVITY_LIMIT);
      onChange();
    },
    clear: () => {
      entries = [];
      onChange();
    },
  };
}
