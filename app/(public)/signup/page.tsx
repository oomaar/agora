import { SignUpForm } from "@/components/auth/SignUpForm";
import { PublicSplitLayout } from "@/components/public/PublicSplitLayout";

export default function SignupPage() {
  return (
    <PublicSplitLayout>
      <SignUpForm />
    </PublicSplitLayout>
  );
}
