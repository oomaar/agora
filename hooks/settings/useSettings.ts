"use client";

import { useQuery } from "@/hooks/data/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type UserSettings } from "@/types/domain";

export function useSettings() {
  return useQuery<UserSettings>(queryKeys.settings(), (source) =>
    source.getSettings(),
  );
}
