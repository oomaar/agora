"use client";

import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSettings } from "@/hooks/settings/useSettings";
import { SETTINGS_SKELETON_ROWS } from "@/lib/settings/constants";
import { type SettingsQueryProps } from "@/types/settings";

// Loading and error states around anything that reads the saved settings.
export function SettingsQuery({ children }: SettingsQueryProps) {
  const settings = useSettings();

  if (settings.status === "loading") {
    return (
      <div
        role="status"
        aria-label="Loading settings"
        className="flex flex-col gap-5"
      >
        {Array.from({ length: SETTINGS_SKELETON_ROWS }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="w-32" />
            <Skeleton className="w-52" />
          </div>
        ))}
      </div>
    );
  }

  if (settings.status === "error") {
    return (
      <ErrorState
        title="Couldn't load your settings"
        description={settings.error.message}
        actions={
          <Button variant="danger" onClick={settings.retry}>
            Try again
          </Button>
        }
      />
    );
  }

  return children(settings.data);
}
