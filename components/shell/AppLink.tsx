"use client";

import Link from "next/link";
import { useAppPath } from "@/hooks/shell/useAppPath";
import { type AppLinkProps } from "@/types/shell";

// A link to an app route; inside the demo it stays under /demo.
export function AppLink({ href, ...props }: AppLinkProps) {
  const appPath = useAppPath();
  return <Link href={appPath(href)} {...props} />;
}
