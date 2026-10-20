import { SignUpForm } from "@/components/auth/SignUpForm";
import { PublicSplitLayout } from "@/components/public/PublicSplitLayout";
import { redirectIfSignedIn } from "@/lib/auth/redirectIfSignedIn";

export default async function SignupPage() {
  await redirectIfSignedIn();
  return (
    <PublicSplitLayout>
      <SignUpForm />
    </PublicSplitLayout>
  );
}
