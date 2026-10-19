"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type UserView } from "@/types/domain";

export function useCurrentUser() {
  return useQuery<UserView>(queryKeys.currentUser(), (source) =>
    source.getCurrentUser(),
  );
}
