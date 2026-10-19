"use client";

import Link from "next/link";
import { type FormEvent } from "react";
import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { PASSWORD_MIN_LENGTH, WELCOME_PATH } from "@/lib/auth/constants";
import { TEXT_LINK } from "@/lib/public/constants";
import { readFormText } from "@/utils/readFormText";

export function SignUpForm() {
  const { pending, fieldErrors, formError, submit } = useSignUp();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submit({
      name: readFormText(data, "name"),
      handle: readFormText(data, "handle"),
      email: readFormText(data, "email"),
      password: readFormText(data, "password"),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[24px] font-semibold tracking-[-0.01em]">
          Create your account
        </h2>
        <p className="text-caption text-ag-text-secondary">
          Accounts are simulated and only stored in this browser.
        </p>
      </div>
      <Input
        label="Display name"
        name="name"
        autoComplete="name"
        fieldSize="lg"
        error={fieldErrors.name}
      />
      <Input
        label="Handle"
        name="handle"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        fieldSize="lg"
        hint="Lowercase letters, numbers, dots or underscores."
        error={fieldErrors.handle}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        fieldSize="lg"
        error={fieldErrors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        fieldSize="lg"
        hint={`At least ${PASSWORD_MIN_LENGTH} characters.`}
        error={fieldErrors.password}
      />
      <FormError message={formError} />
      <Button type="submit" size="lg" fullWidth loading={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-[13px] text-ag-text-secondary">
        Already have an account?{" "}
        <Link href={WELCOME_PATH} className={TEXT_LINK}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
