"use client";

import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAccountForm } from "@/hooks/settings/useAccountForm";
import { BIO_MAX_LENGTH, NAME_MAX_LENGTH } from "@/lib/data/constants";
import { type AccountFormProps } from "@/types/settings";

export function AccountForm({ user }: AccountFormProps) {
  const form = useAccountForm(user);
  const { values, errors } = form;
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        form.submit();
      }}
      className="flex flex-col gap-3.5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Display name"
          value={values.name}
          onChange={(event) => form.setValue("name", event.target.value)}
          error={errors.name}
          maxLength={NAME_MAX_LENGTH}
          autoComplete="name"
          readOnly={form.saving}
        />
        <Input
          label="Handle"
          value={values.handle}
          onChange={(event) => form.setValue("handle", event.target.value)}
          error={errors.handle}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          readOnly={form.saving}
        />
      </div>
      <Textarea
        label="Bio"
        value={values.bio}
        onChange={(event) => form.setValue("bio", event.target.value)}
        error={errors.bio}
        hint={`${values.bio.length}/${BIO_MAX_LENGTH}`}
        maxLength={BIO_MAX_LENGTH}
        readOnly={form.saving}
      />
      <FormError message={form.formError} />
      <Button
        type="submit"
        size="sm"
        loading={form.saving}
        disabled={!form.changed}
        className="self-start"
      >
        {form.saving ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
