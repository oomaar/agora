"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavCounterBadge } from "@/components/shell/NavCounterBadge";
import { Icon } from "@/components/ui/Icon";
import { useSession } from "@/hooks/auth/useSession";
import { NAV_LINK_VARIANTS } from "@/lib/shell/nav";
import { isNavItemActive } from "@/utils/isNavItemActive";
import { withHandle } from "@/utils/withHandle";
import { cn } from "@/utils/cn";
import { type NavLinkProps } from "@/types/shell";

export function NavLink({ item, variant }: NavLinkProps) {
  const pathname = usePathname();
  const { session } = useSession();
  const href = withHandle(item.href, session.handle);
  const active = isNavItemActive(
    pathname,
    item.match.map((path) => withHandle(path, session.handle)),
  );
  const styles = NAV_LINK_VARIANTS[variant];
  const isSidebar = variant === "sidebar";
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(styles.base, active ? styles.active : styles.inactive)}
    >
      <Icon name={item.icon} size={styles.iconSize} />
      {isSidebar ? (
        <span className="sr-only nav:not-sr-only nav:flex-1">{item.label}</span>
      ) : (
        <span>{item.tabLabel ?? item.label}</span>
      )}
      {isSidebar && item.counter && <NavCounterBadge counter={item.counter} />}
    </Link>
  );
}
