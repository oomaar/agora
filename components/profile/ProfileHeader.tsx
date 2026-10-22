"use client";

import { useRouter } from "next/navigation";
import { ProfileStat } from "@/components/profile/ProfileStat";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FollowButton } from "@/components/ui/FollowButton";
import { useToggleFollow } from "@/hooks/users/useToggleFollow";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { formatJoinDate } from "@/utils/formatJoinDate";
import { type ProfileHeaderProps } from "@/types/profile";

const SETTINGS_HREF =
  NAV_ITEMS.find((item) => item.id === "settings")?.href ?? "/settings";

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const router = useRouter();
  const follow = useToggleFollow();
  return (
    <section
      aria-label={`${user.name}'s profile`}
      className="border-b border-ag-border-subtle"
    >
      {/* Cover photos arrive with uploads (9.3). */}
      <div
        aria-hidden="true"
        className="media-stripes h-45 border-b border-ag-border-subtle"
      />
      <div className="flex flex-col gap-3 px-5 pb-4.5">
        <div className="-mt-11 flex items-end justify-between gap-3">
          <Avatar name={user.name} handle={user.handle} size="xl" />
          {user.isSelf ? (
            <Button
              variant="secondary"
              size="sm"
              pill
              onClick={() => router.push(SETTINGS_HREF)}
            >
              Edit profile
            </Button>
          ) : (
            <FollowButton
              following={user.isFollowing}
              onToggle={() => follow.run(user)}
              aria-label={`${user.isFollowing ? "Unfollow" : "Follow"} ${user.name}`}
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="truncate text-[21px] font-semibold">{user.name}</h2>
          <p className="truncate text-[14px] text-ag-text-secondary">
            @{user.handle}
          </p>
        </div>
        {user.bio && (
          <p className="whitespace-pre-line wrap-break-word text-body text-pretty">
            {user.bio}
          </p>
        )}
        <p className="flex flex-wrap gap-x-4.5 gap-y-1 text-[14px] text-ag-text-secondary">
          {user.location && <span>{user.location}</span>}
          <span>{formatJoinDate(user.joinedAt)}</span>
        </p>
        <p className="flex flex-wrap gap-x-4.5 gap-y-1 text-[14px]">
          <ProfileStat count={user.followingCount} label="Following" />
          <ProfileStat
            count={user.followerCount}
            label={user.followerCount === 1 ? "Follower" : "Followers"}
          />
        </p>
      </div>
    </section>
  );
}
