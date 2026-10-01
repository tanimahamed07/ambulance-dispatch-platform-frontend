import RoleGuard from "@/components/auth/role-guard";

export default function CallerLayout({ children }: LayoutProps<"/caller">) {
  return <RoleGuard roles={["DISPATCHER"]}>{children}</RoleGuard>;
}
