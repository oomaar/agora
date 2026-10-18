"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { TOAST_DURATION_MS, TOAST_LIMIT } from "@/lib/ui/toast";
import {
  type ToastContextValue,
  type ToastItem,
  type ToastKind,
  type ToastProviderProps,
} from "@/types/toast";

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (kind: ToastKind, message: string) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, kind, message }].slice(-TOAST_LIMIT));
      timers.current.set(id, setTimeout(() => dismiss(id), TOAST_DURATION_MS));
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (message) => show("success", message),
      error: (message) => show("error", message),
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}
