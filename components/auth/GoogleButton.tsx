"use client";

import { FormError } from "@/components/auth/FormError";
import { GoogleMark } from "@/components/auth/GoogleMark";
import { Button } from "@/components/ui/Button";
import { useGoogleSignIn } from "@/hooks/auth/useGoogleSignIn";
import { type GoogleButtonProps } from "@/types/auth";

// Signs in or creates an account with Google; new accounts get a handle made from their name.
export function GoogleButton({ initialError = null }: GoogleButtonProps) {
  const { pending, error, start } = useGoogleSignIn(initialError);
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        loading={pending}
        onClick={start}
      >
        {!pending && <GoogleMark />}
        {pending ? "Opening Google…" : "Continue with Google"}
      </Button>
      <FormError message={error} />
    </div>
  );
}
