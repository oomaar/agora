"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { useToast } from "@/hooks/ui/useToast";
import { queryKeys } from "@/lib/data/queryKeys";
import { type SettingsUpdate } from "@/types/dataSource";
import { type UserSettings } from "@/types/domain";

// Optimistic: the switch moves at once and moves back if saving fails.
export function useUpdateSettings() {
  const toast = useToast();
  const key = queryKeys.settings();
  return useMutation<SettingsUpdate, UserSettings>({
    mutate: (source, update) => source.updateSettings(update),
    onMutate: (cache, update) => {
      const previous: SettingsUpdate = {};
      cache.setData<UserSettings>(key, (current) => {
        for (const name of Object.keys(update) as (keyof UserSettings)[]) {
          Object.assign(previous, { [name]: current[name] });
        }
        return { ...current, ...update };
      });
      return () =>
        cache.setData<UserSettings>(key, (current) => ({
          ...current,
          ...previous,
        }));
    },
    onSuccess: (cache, settings) => cache.setData(key, () => settings),
    onError: () =>
      toast.error("Couldn't save your settings. They were reverted."),
  });
}
