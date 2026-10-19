import { AppShell } from "@/components/shell/AppShell";
import { DataProvider } from "@/context/DataContext";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <DataProvider preset="app">
      <AppShell>{children}</AppShell>
    </DataProvider>
  );
}
