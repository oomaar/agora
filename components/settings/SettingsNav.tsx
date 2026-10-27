"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/hooks/auth/useSession";
import { SETTINGS_SECTIONS } from "@/lib/shell/constants";
import { SETTINGS_NAV_ITEM } from "@/lib/settings/constants";
import { cn } from "@/utils/cn";

export function SettingsNav() {
  const pathname = usePathname();
  const { signOut } = useSession();
  return (
    <nav
      aria-label="Settings"
      className="flex flex-none gap-1 overflow-x-auto border-b border-ag-border-subtle px-3 py-2.5 sm:sticky sm:top-0 sm:h-dvh sm:w-52 sm:flex-col sm:gap-0.5 sm:overflow-visible sm:border-b-0 sm:border-r sm:px-2.5 sm:py-4 nav:w-60"
    >
      <p className="hidden px-2.5 pb-3.5 text-h3 sm:block">Settings</p>
      {SETTINGS_SECTIONS.map((section) => {
        const href = `/settings/${section.id}`;
        const active = pathname === href;
        return (
          <Link
            key={section.id}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              SETTINGS_NAV_ITEM,
              active
                ? "bg-ag-raised font-semibold text-ag-text"
                : section.id === "demo"
                  ? "text-ag-demo-text-muted"
                  : "text-ag-text-secondary",
            )}
          >
            {section.label}
          </Link>
        );
      })}
      <span
        aria-hidden="true"
        className="my-2.5 hidden h-px bg-ag-border-subtle sm:block"
      />
      <button
        type="button"
        onClick={signOut}
        className={cn(
          SETTINGS_NAV_ITEM,
          "cursor-pointer text-left text-ag-danger",
        )}
      >
        Log out
      </button>
    </nav>
  );
}
