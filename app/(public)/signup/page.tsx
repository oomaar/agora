import { PublicPlaceholder } from "@/components/public/PublicPlaceholder";

export default function SignupPage() {
  return (
    <PublicPlaceholder
      title="Create account"
      link={{ href: "/", label: "Back to sign in" }}
    />
  );
}
