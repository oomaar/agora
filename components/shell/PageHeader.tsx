import { type PageHeaderProps } from "@/types/shell";

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-ag-border-subtle bg-ag-bg/92 px-5 py-4 backdrop-blur-sm">
      <h1 className="text-h3">{title}</h1>
    </header>
  );
}
