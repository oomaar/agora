"use client";

import { useAppRouter } from "@/hooks/shell/useAppRouter";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfilePosts } from "@/components/profile/ProfilePosts";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useUser } from "@/hooks/users/useUser";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { type ProfileViewProps } from "@/types/profile";

export function ProfileView({ handle }: ProfileViewProps) {
  const router = useAppRouter();
  const user = useUser(handle);

  if (user.status === "loading") {
    return (
      <div
        role="status"
        aria-label="Loading profile"
        className="border-b border-ag-border-subtle"
      >
        <div className="media-stripes h-45 border-b border-ag-border-subtle" />
        <div className="flex flex-col gap-3 px-5 pb-4.5">
          <Skeleton
            shape="circle"
            className="-mt-11 size-24 border-4 border-ag-bg"
          />
          <Skeleton className="w-40" />
          <Skeleton className="w-24" />
          <Skeleton className="w-[80%]" />
        </div>
      </div>
    );
  }

  if (user.status === "error") {
    if (user.error.code === "not-found") {
      return (
        <EmptyState
          icon="user"
          title="This account doesn't exist"
          description={`Nobody uses the handle @${handle}. Check the spelling, or search for them.`}
          actions={
            <Button
              variant="secondary"
              onClick={() => router.push(NAV_ITEMS[0].href)}
            >
              Back to Home
            </Button>
          }
        />
      );
    }
    return (
      <ErrorState
        title="Couldn't load this profile"
        description={user.error.message}
        actions={
          <Button variant="danger" onClick={user.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  return (
    <>
      <ProfileHeader user={user.data} />
      <ProfilePosts user={user.data} />
    </>
  );
}
