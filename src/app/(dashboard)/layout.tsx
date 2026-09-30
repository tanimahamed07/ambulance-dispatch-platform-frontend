import AuthGuard from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/layout/dashboard/DashboardShell";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
