import { PhotoSetting } from "@/components/settings/PhotoSetting";
import { type ProfilePhotoSettingsProps } from "@/types/settings";

// Photos save as soon as they're uploaded; the form below saves the text fields.
export function ProfilePhotoSettings({ user }: ProfilePhotoSettingsProps) {
  return (
    <div className="flex flex-col border-b border-ag-border-subtle pb-3">
      <PhotoSetting user={user} kind="avatar" />
      <PhotoSetting user={user} kind="cover" />
    </div>
  );
}
