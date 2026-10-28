"use client";

import { AppLink } from "@/components/shell/AppLink";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import { useToggleFollow } from "@/hooks/users/useToggleFollow";
import { type PersonProps } from "@/types/explore";

export function PersonRow({ person }: PersonProps) {
  const follow = useToggleFollow();
  return (
    <li className="flex items-start gap-3 px-5 py-3">
      <AppLink
        href={`/u/${person.handle}`}
        className="flex min-w-0 flex-1 gap-3 rounded-md outline-none focus-visible:shadow-ag-focus-ring"
      >
        <Avatar
          name={person.name}
          handle={person.handle}
          src={person.avatarUrl}
        />
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[14.5px] font-semibold">
            {person.name}
          </span>
          <span className="truncate text-[13px] text-ag-text-secondary">
            @{person.handle}
          </span>
          {person.bio && (
            <span className="text-[13.5px] leading-[1.45] text-pretty">
              {person.bio}
            </span>
          )}
        </span>
      </AppLink>
      {!person.isSelf && (
        <FollowButton
          following={person.isFollowing}
          onToggle={() => follow.run(person)}
          aria-label={`${person.isFollowing ? "Unfollow" : "Follow"} ${person.name}`}
        />
      )}
    </li>
  );
}
