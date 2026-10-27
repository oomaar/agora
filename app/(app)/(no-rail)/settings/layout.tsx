import { SettingsLayout } from "@/components/settings/SettingsLayout";

export default function SettingsRouteLayout({
  children,
}: LayoutProps<"/settings">) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
