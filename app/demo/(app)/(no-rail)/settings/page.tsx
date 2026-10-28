import { redirect } from "next/navigation";
import { DEMO_PATH } from "@/lib/public/constants";
import { SETTINGS_SECTIONS } from "@/lib/shell/constants";

export default function DemoSettingsPage() {
  redirect(`${DEMO_PATH}/settings/${SETTINGS_SECTIONS[0].id}`);
}
