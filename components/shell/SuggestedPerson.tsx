"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import { type SuggestedPersonProps } from "@/types/shell";

export function SuggestedPerson({ person }: SuggestedPersonProps) {
  const [following, setFollowing] = useState(false);
  return (
    <li className="flex items-center gap-2.5 px-4 py-2.5">
      <Link
        href={`/u/${person.handle}`}
        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md outline-none focus-visible:shadow-ag-focus-ring"
      >
        <Avatar name={person.name} handle={person.handle} size="sm" />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[13.5px] font-semibold">
            {person.name}
          </span>
          <span className="truncate text-caption text-ag-text-secondary">
            @{person.handle}
          </span>
        </span>
      </Link>
      <FollowButton
        following={following}
        onToggle={setFollowing}
        aria-label={`${following ? "Unfollow" : "Follow"} ${person.name}`}
      />
    </li>
  );
}
