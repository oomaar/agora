"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { NAV_LINK_VARIANTS } from "@/lib/shell/nav";
import { isNavItemActive } from "@/utils/isNavItemActive";
import { cn } from "@/utils/cn";
import { type NavLinkProps } from "@/types/shell";

export function NavLink({ item, variant }: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item.match);
  const styles = NAV_LINK_VARIANTS[variant];
  const isSidebar = variant === "sidebar";
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(styles.base, active ? styles.active : styles.inactive)}
    >
      <Icon name={item.icon} size={styles.iconSize} />
      {isSidebar ? (
        <span className="sr-only nav:not-sr-only nav:flex-1">{item.label}</span>
      ) : (
        <span>{item.tabLabel ?? item.label}</span>
      )}
      {isSidebar && item.counter && (
        <Counter
          value={item.counter.value}
          tone={item.counter.tone}
          label={item.counter.label}
          className="absolute right-0.5 top-0.5 nav:static"
        />
      )}
    </Link>
  );
}
