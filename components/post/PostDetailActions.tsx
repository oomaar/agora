"use client";

import { Icon } from "@/components/ui/Icon";
import { POST_DETAIL_ACTION } from "@/lib/ui/post";
import { cn } from "@/utils/cn";
import { type PostDetailActionsProps } from "@/types/postDetail";

export function PostDetailActions({ actions }: PostDetailActionsProps) {
  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={action.onClick}
          aria-pressed={action.active}
          className={cn(
            POST_DETAIL_ACTION,
            action.active && action.activeClassName,
          )}
        >
          {/* Labels alone on phones, so four of them fit in one row. */}
          <span className="hidden sm:inline-flex">
            <Icon
              name={action.icon}
              size={17}
              filled={action.id === "like" && action.active}
            />
          </span>
          <span className="truncate">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
