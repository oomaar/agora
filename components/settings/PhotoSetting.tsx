"use client";

import Image from "next/image";
import { SettingRow } from "@/components/settings/SettingRow";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FilePickerButton } from "@/components/ui/FilePickerButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProfilePhoto } from "@/hooks/settings/useProfilePhoto";
import { PHOTO_ACCEPT } from "@/lib/media/constants";
import {
  PROFILE_PHOTO_HINT,
  PROFILE_PHOTO_LABELS,
} from "@/lib/settings/constants";
import { type PhotoSettingProps } from "@/types/settings";

// Preview, Upload / Change and Remove for the profile photo or the cover.
export function PhotoSetting({ user, kind }: PhotoSettingProps) {
  const photo = useProfilePhoto(user, kind);
  const label = PROFILE_PHOTO_LABELS[kind];
  return (
    <SettingRow label={label} hint={PROFILE_PHOTO_HINT}>
      <div className="flex flex-col gap-2 sm:items-end">
        <div className="flex items-center gap-3">
          {kind === "avatar" ? (
            <Avatar
              name={user.name}
              handle={user.handle}
              src={photo.src}
              size="lg"
            />
          ) : (
            <span className="media-stripes relative h-14 w-28 flex-none overflow-hidden rounded-md border border-ag-border-subtle">
              {photo.src && (
                <Image
                  src={photo.src}
                  alt={label}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              )}
            </span>
          )}
          <FilePickerButton
            accept={PHOTO_ACCEPT}
            onPick={photo.pick}
            variant="secondary"
            size="sm"
            disabled={photo.busy}
            aria-label={`${photo.saved ? "Change" : "Upload"} ${label.toLowerCase()}`}
          >
            {photo.saved ? "Change" : "Upload"}
          </FilePickerButton>
          {photo.saved && (
            <Button
              variant="dangerOutline"
              size="sm"
              disabled={photo.busy}
              onClick={photo.remove}
              aria-label={`Remove ${label.toLowerCase()}`}
            >
              Remove
            </Button>
          )}
        </div>
        {photo.uploading && (
          <ProgressBar
            value={photo.progress}
            label={`Uploading ${label.toLowerCase()}`}
            className="sm:w-56"
          />
        )}
        {photo.error && (
          <p
            role="alert"
            className="flex items-center gap-3 text-[13px] text-ag-danger-text"
          >
            {photo.error}
            {photo.canRetry && (
              <Button variant="secondary" size="sm" onClick={photo.retry}>
                Retry
              </Button>
            )}
          </p>
        )}
      </div>
    </SettingRow>
  );
}
