import { PublicPlaceholder } from "@/components/public/PublicPlaceholder";

export default function WelcomePage() {
  return (
    <PublicPlaceholder
      title="Welcome & sign in"
      link={{ href: "/home", label: "Continue to the app" }}
    />
  );
}
