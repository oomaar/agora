import { type SettingsPanelProps } from "@/types/settings";

export function SettingsPanel({
  title,
  description,
  children,
}: SettingsPanelProps) {
  return (
    <section className="flex max-w-160 flex-col gap-5 px-5 py-6 sm:px-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-h3">{title}</h1>
        {description && (
          <p className="text-body-sm text-ag-text-secondary">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}
