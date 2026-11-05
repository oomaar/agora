import { BackButton } from "@/components/shell/BackButton";
import { MobileTopBar } from "@/components/shell/MobileTopBar";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { SHELL_STICKY_TOP } from "@/lib/shell/nav";
import { cn } from "@/utils/cn";
import { type PageHeaderProps } from "@/types/shell";

export function PageHeader({
  title,
  back = false,
  brand = false,
  action,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        SHELL_STICKY_TOP,
        "z-10 bg-ag-bg/92 backdrop-blur-sm",
        !children && "border-b border-ag-border-subtle",
      )}
    >
      {brand && <MobileTopBar />}
      <div
        className={cn(
          "flex items-center gap-3.5 px-5",
          back ? "py-3.5" : children ? "pt-4" : "py-4",
          // The top bar replaces the title row on phones; screen readers still get the title.
          brand && "max-sm:sr-only",
        )}
      >
        {back && <BackButton fallbackHref={NAV_ITEMS[0].href} />}
        <h1 className="text-h3">{title}</h1>
        {action && <div className="ml-auto">{action}</div>}
      </div>
      {children}
    </header>
  );
}
