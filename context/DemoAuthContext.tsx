"use client";

import { useMemo } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useExitDemo } from "@/hooks/demo/useExitDemo";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { DEMO_SESSION, EXIT_DEMO_LABEL } from "@/lib/demo/constants";
import { type DemoProvidersProps } from "@/types/demo";

// Stands in for the real session inside the demo: signed in as the persona (following a
// name or handle changed in Settings), and "signing out" leaves the demo.
export function DemoAuthProvider({ children }: DemoProvidersProps) {
  const exit = useExitDemo();
  const { data: user } = useCurrentUser();
  const name = user?.name ?? DEMO_SESSION.name;
  const handle = user?.handle ?? DEMO_SESSION.handle;
  const value = useMemo(
    () => ({
      session: { ...DEMO_SESSION, name, handle },
      signOut: async () => exit(),
      signOutLabel: EXIT_DEMO_LABEL,
    }),
    [exit, name, handle],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
