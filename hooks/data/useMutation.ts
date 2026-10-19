"use client";

import { useRef, useState } from "react";
import { useData } from "@/hooks/data/useData";
import { toDataError, type DataError } from "@/services/dataError";
import {
  type MutationOptions,
  type MutationResult,
  type MutationStatus,
} from "@/types/query";

// Runs a write against the data source: optional optimistic update first,
// rolled back if the request fails. `retry` repeats the last variables.
export function useMutation<TVariables, TResult>({
  mutate,
  onMutate,
  onSuccess,
  onError,
}: MutationOptions<TVariables, TResult>): MutationResult<TVariables, TResult> {
  const { source, cache } = useData();
  const [status, setStatus] = useState<MutationStatus>("idle");
  const [error, setError] = useState<DataError | null>(null);
  const lastVariables = useRef<{ value: TVariables } | null>(null);

  async function run(variables: TVariables): Promise<TResult | undefined> {
    lastVariables.current = { value: variables };
    setStatus("pending");
    setError(null);
    const rollback = onMutate?.(cache, variables);
    try {
      const result = await mutate(source, variables);
      onSuccess?.(cache, result, variables);
      setStatus("success");
      return result;
    } catch (caught) {
      const dataError = toDataError(caught);
      rollback?.();
      onError?.(dataError, variables);
      setError(dataError);
      setStatus("error");
      return undefined;
    }
  }

  return {
    status,
    error,
    run,
    retry: () => {
      if (lastVariables.current) void run(lastVariables.current.value);
    },
    reset: () => {
      setStatus("idle");
      setError(null);
    },
  };
}
