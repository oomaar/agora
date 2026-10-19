import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shell/PageHeader";
import { SETTINGS_SECTIONS } from "@/lib/shell/constants";

// Only the known sections exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SETTINGS_SECTIONS.map((section) => ({ section: section.id }));
}

export default async function SettingsSectionPage({
  params,
}: PageProps<"/settings/[section]">) {
  const { section } = await params;
  const current = SETTINGS_SECTIONS.find((item) => item.id === section);
  if (!current) notFound();
  return <PageHeader title={current.label} />;
}
