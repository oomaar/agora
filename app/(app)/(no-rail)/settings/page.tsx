import { redirect } from "next/navigation";
import { SETTINGS_SECTIONS } from "@/lib/shell/constants";

export default function SettingsPage() {
  redirect(`/settings/${SETTINGS_SECTIONS[0].id}`);
}
