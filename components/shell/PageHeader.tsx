import { BackButton } from "@/components/shell/BackButton";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { cn } from "@/utils/cn";
import { type PageHeaderProps } from "@/types/shell";

export function PageHeader({ title, back = false, children }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-ag-bg/92 backdrop-blur-sm",
        !children && "border-b border-ag-border-subtle",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3.5 px-5",
          back ? "py-3.5" : children ? "pt-4" : "py-4",
        )}
      >
        {back && <BackButton fallbackHref={NAV_ITEMS[0].href} />}
        <h1 className="text-h3">{title}</h1>
      </div>
      {children}
    </header>
  );
}
