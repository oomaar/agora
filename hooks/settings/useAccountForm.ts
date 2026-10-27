"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ui/useToast";
import { useUpdateProfile } from "@/hooks/users/useUpdateProfile";
import { normalizeHandle, validateProfile } from "@/services/auth/validation";
import { hasFieldErrors } from "@/utils/hasFieldErrors";
import { type FieldErrors } from "@/types/auth";
import { type ProfileUpdate } from "@/types/dataSource";
import { type UserView } from "@/types/domain";
import { type AccountForm, type ProfileField } from "@/types/settings";

function toUpdate(values: ProfileUpdate): ProfileUpdate {
  return {
    name: values.name.trim(),
    handle: normalizeHandle(values.handle),
    bio: values.bio.trim(),
  };
}

// Display name, handle and bio. Checked here first; the server checks again (e.g. a taken handle).
export function useAccountForm(user: UserView): AccountForm {
  const router = useRouter();
  const toast = useToast();
  const update = useUpdateProfile();
  const [values, setValues] = useState<ProfileUpdate>({
    name: user.name,
    handle: user.handle,
    bio: user.bio,
  });
  const [errors, setErrors] = useState<FieldErrors<ProfileField>>({});
  const next = toUpdate(values);

  return {
    values,
    setValue: (field, value) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      update.reset();
    },
    errors,
    formError: update.status === "error" ? (update.error?.message ?? null) : null,
    changed:
      next.name !== user.name ||
      next.handle !== user.handle ||
      next.bio !== user.bio,
    saving: update.status === "pending",
    submit: async () => {
      const problems = validateProfile(values);
      setErrors(problems);
      if (hasFieldErrors(problems)) return;
      const saved = await update.run(next);
      if (!saved) return;
      setValues({ name: saved.name, handle: saved.handle, bio: saved.bio });
      toast.success("Profile saved");
      // The session hands the nav its handle, so read it again.
      router.refresh();
    },
  };
}
