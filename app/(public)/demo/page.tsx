import { PublicPlaceholder } from "@/components/public/PublicPlaceholder";

export default function DemoLandingPage() {
  return (
    <PublicPlaceholder
      title="Demo landing"
      link={{ href: "/home", label: "Back to the app" }}
    />
  );
}
