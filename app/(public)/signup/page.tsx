import { type Metadata } from "next";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { PublicSplitLayout } from "@/components/public/PublicSplitLayout";
import { redirectIfSignedIn } from "@/lib/auth/redirectIfSignedIn";
import { SIGNUP_DESCRIPTION } from "@/lib/site/constants";

export const metadata: Metadata = {
  title: "Create account",
  description: SIGNUP_DESCRIPTION,
};

export default async function SignupPage() {
  await redirectIfSignedIn();
  return (
    <PublicSplitLayout>
      <SignUpForm />
    </PublicSplitLayout>
  );
}
