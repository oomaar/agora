import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Design system · Agora",
  robots: { index: false },
};

// Dev-only route: production builds render a 404.
export default function DesignSystemLayout({ children }: LayoutProps<"/design-system">) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return children;
}
