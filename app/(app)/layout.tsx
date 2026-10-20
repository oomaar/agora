import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { getSession } from "@/lib/auth/getSession";
import { WELCOME_PATH } from "@/lib/auth/constants";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();
  if (!session) redirect(WELCOME_PATH);
  return (
    <AuthProvider session={session}>
      <DataProvider preset="app">
        <AppShell>{children}</AppShell>
      </DataProvider>
    </AuthProvider>
  );
}
