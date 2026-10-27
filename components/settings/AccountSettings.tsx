"use client";

import { AccountForm } from "@/components/settings/AccountForm";
import { ProfilePhotoSettings } from "@/components/settings/ProfilePhotoSettings";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";

export function AccountSettings() {
  const user = useCurrentUser();
  return (
    <SettingsPanel
      title="Account"
      description="How you appear to people on Agora."
    >
      {user.status === "loading" && (
        <div
          role="status"
          aria-label="Loading your account"
          className="flex flex-col gap-5"
        >
          <Skeleton shape="block" className="h-10" />
          <Skeleton shape="block" className="h-10" />
          <Skeleton shape="block" className="h-16" />
        </div>
      )}
      {user.status === "error" && (
        <ErrorState
          title="Couldn't load your account"
          description={user.error.message}
          actions={
            <Button variant="danger" onClick={user.retry}>
              Try again
            </Button>
          }
        />
      )}
      {(user.status === "success" || user.status === "empty") && (
        <>
          <ProfilePhotoSettings user={user.data} />
          <AccountForm key={user.data.id} user={user.data} />
        </>
      )}
    </SettingsPanel>
  );
}
