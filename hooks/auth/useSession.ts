"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { type AuthContextValue } from "@/types/auth";

export function useSession(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useSession must be used inside <AuthProvider>");
  return context;
}
