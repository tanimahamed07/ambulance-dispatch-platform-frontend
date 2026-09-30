import RoleGuard from "@/components/auth/role-guard";

export default function CallerLayout({ children }: LayoutProps<"/caller">) {
  return <RoleGuard roles={["CALLER"]}>{children}</RoleGuard>;
}
