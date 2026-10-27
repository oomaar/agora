"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import { useToggleFollow } from "@/hooks/users/useToggleFollow";
import { type PersonProps } from "@/types/explore";

export function PersonCard({ person }: PersonProps) {
  const follow = useToggleFollow();
  return (
    <li className="flex flex-col items-start gap-2 rounded-lg border border-ag-border bg-ag-surface p-3.5">
      <Link
        href={`/u/${person.handle}`}
        className="flex min-w-0 flex-col items-start gap-2 self-stretch rounded-md outline-none focus-visible:shadow-ag-focus-ring"
      >
        <Avatar
          name={person.name}
          handle={person.handle}
          src={person.avatarUrl}
        />
        <span className="flex min-w-0 flex-col self-stretch">
          <span className="truncate text-[14px] font-semibold">
            {person.name}
          </span>
          <span className="truncate text-[12.5px] text-ag-text-secondary">
            @{person.handle}
          </span>
        </span>
      </Link>
      {person.bio && (
        <p className="line-clamp-3 text-[13px] leading-[1.45] text-ag-text-secondary">
          {person.bio}
        </p>
      )}
      <FollowButton
        following={person.isFollowing}
        onToggle={() => follow.run(person)}
        aria-label={`${person.isFollowing ? "Unfollow" : "Follow"} ${person.name}`}
        className="mt-auto"
      />
    </li>
  );
}
