"use client";

import { usePathname } from "next/navigation";
import { AppLink } from "@/components/shell/AppLink";
import { useSession } from "@/hooks/auth/useSession";
import { useAppPath } from "@/hooks/shell/useAppPath";
import { SETTINGS_SECTIONS } from "@/lib/shell/constants";
import { SETTINGS_NAV_ITEM } from "@/lib/settings/constants";
import { cn } from "@/utils/cn";

export function SettingsNav() {
  const pathname = usePathname();
  const { signOut, signOutLabel } = useSession();
  const appPath = useAppPath();
  return (
    <nav
      aria-label="Settings"
      className="flex flex-none gap-1 overflow-x-auto border-b border-ag-border-subtle px-3 py-2.5 sm:sticky sm:top-[var(--ag-shell-top,0px)] sm:h-[calc(100dvh-var(--ag-shell-top,0px))] sm:w-52 sm:flex-col sm:gap-0.5 sm:overflow-visible sm:border-b-0 sm:border-r sm:px-2.5 sm:py-4 nav:w-60"
    >
      <p className="hidden px-2.5 pb-3.5 text-h3 sm:block">Settings</p>
      {SETTINGS_SECTIONS.map((section) => {
        const href = `/settings/${section.id}`;
        const active = pathname === appPath(href);
        return (
          <AppLink
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
          </AppLink>
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
        {signOutLabel}
      </button>
    </nav>
  );
}
