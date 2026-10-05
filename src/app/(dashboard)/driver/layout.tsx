import RoleGuard from "@/components/auth/role-guard";

export default function DriverLayout({ children }: LayoutProps<"/caller">) {
  return <RoleGuard roles={["DRIVER"]}>{children}</RoleGuard>;
  // return <>{children}</>;
}
