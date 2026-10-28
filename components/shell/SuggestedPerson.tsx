"use client";

import { AppLink } from "@/components/shell/AppLink";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import { useToggleFollow } from "@/hooks/users/useToggleFollow";
import { type SuggestedPersonProps } from "@/types/shell";

export function SuggestedPerson({ person }: SuggestedPersonProps) {
  const follow = useToggleFollow();
  return (
    <li className="flex items-center gap-2.5 px-4 py-2.5">
      <AppLink
        href={`/u/${person.handle}`}
        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md outline-none focus-visible:shadow-ag-focus-ring"
      >
        <Avatar
          name={person.name}
          handle={person.handle}
          src={person.avatarUrl}
          size="sm"
        />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[13.5px] font-semibold">
            {person.name}
          </span>
          <span className="truncate text-caption text-ag-text-secondary">
            @{person.handle}
          </span>
        </span>
      </AppLink>
      <FollowButton
        following={person.isFollowing}
        onToggle={() => follow.run(person)}
        aria-label={`${person.isFollowing ? "Unfollow" : "Follow"} ${person.name}`}
      />
    </li>
  );
}
