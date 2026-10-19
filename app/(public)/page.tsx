import { SignInForm } from "@/components/auth/SignInForm";
import { DemoInvite } from "@/components/public/DemoInvite";
import { OrDivider } from "@/components/public/OrDivider";
import { PublicSplitLayout } from "@/components/public/PublicSplitLayout";

export default function WelcomePage() {
  return (
    <PublicSplitLayout>
      <SignInForm />
      <OrDivider />
      <DemoInvite />
    </PublicSplitLayout>
  );
}
