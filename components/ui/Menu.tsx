"use client";

import { useId } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMenu } from "@/hooks/ui/useMenu";
import { cn } from "@/utils/cn";
import { type MenuProps } from "@/types/menu";

export function Menu({
  label,
  trigger,
  items,
  align = "end",
  side = "bottom",
  triggerClassName,
  className,
}: MenuProps) {
  const menuId = useId();
  const {
    open,
    close,
    containerRef,
    triggerRef,
    setItemRef,
    onTriggerClick,
    onTriggerKeyDown,
    onMenuKeyDown,
  } = useMenu(items.length);
  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "grid min-h-8.5 min-w-8.5 cursor-pointer place-items-center rounded-full text-ag-text-secondary outline-none transition-colors hover:bg-ag-hover hover:text-ag-text focus-visible:shadow-ag-focus-ring",
          triggerClassName,
        )}
      >
        {trigger}
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute z-40 flex min-w-50 flex-col rounded-lg p-1.5 elev-1",
            side === "bottom" ? "top-full mt-1.5" : "bottom-full mb-1.5",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={setItemRef(index)}
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                item.onSelect();
                close(true);
              }}
              className={cn(
                "flex h-10 w-full cursor-pointer items-center gap-3 rounded-sm px-3 text-left text-[14px] outline-none hover:bg-ag-border-subtle focus-visible:bg-ag-border-subtle",
                item.danger ? "text-ag-danger" : "text-ag-text",
              )}
            >
              {item.icon && <Icon name={item.icon} size={17} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
