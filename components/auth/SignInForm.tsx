"use client";

import Link from "next/link";
import { type FormEvent } from "react";
import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { SAMPLE_ACCOUNT, SIGNUP_PATH } from "@/lib/auth/constants";
import { TEXT_LINK } from "@/lib/public/constants";
import { readFormText } from "@/utils/readFormText";

// Starts filled in with the sample account, so a visitor can sign in straight away.
export function SignInForm() {
  const { pending, fieldErrors, formError, submit } = useSignIn();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submit({
      email: readFormText(data, "email"),
      password: readFormText(data, "password"),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      <h2 className="text-[24px] font-semibold tracking-[-0.01em]">Sign in</h2>
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        fieldSize="lg"
        defaultValue={SAMPLE_ACCOUNT.email}
        error={fieldErrors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        fieldSize="lg"
        defaultValue={SAMPLE_ACCOUNT.password}
        error={fieldErrors.password}
      />
      <FormError message={formError} />
      <Button type="submit" size="lg" fullWidth loading={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-[13px] text-ag-text-secondary">
        New here?{" "}
        <Link href={SIGNUP_PATH} className={TEXT_LINK}>
          Create an account
        </Link>
      </p>
    </form>
  );
}
