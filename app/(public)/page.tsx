import { SignInForm } from "@/components/auth/SignInForm";
import { DemoInvite } from "@/components/public/DemoInvite";
import { OrDivider } from "@/components/public/OrDivider";
import { PublicSplitLayout } from "@/components/public/PublicSplitLayout";
import { redirectIfSignedIn } from "@/lib/auth/redirectIfSignedIn";
import { AUTH_ERROR_MESSAGES } from "@/lib/auth/errors";
import { OAUTH_ERROR_PARAM } from "@/lib/auth/constants";

export default async function WelcomePage({ searchParams }: PageProps<"/">) {
  await redirectIfSignedIn();
  const oauthError = (await searchParams)[OAUTH_ERROR_PARAM]
    ? AUTH_ERROR_MESSAGES.google
    : null;
  return (
    <PublicSplitLayout>
      <SignInForm oauthError={oauthError} />
      <OrDivider />
      <DemoInvite />
    </PublicSplitLayout>
  );
}
