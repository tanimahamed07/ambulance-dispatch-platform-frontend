import {
  Ambulance,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Navigation,
  Radar,
  Settings,
  Users,
  UserCheck,
} from "lucide-react";
import type { SidebarItems } from "@/types";

export const adminRoutes: SidebarItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  {
    href: "/admin/driver-application",
    label: "Driver Applications",
    icon: UserCheck,
  },
  {
    href: "/admin/ambulances",
    label: "Ambulance Management",
    icon: Ambulance,
  },
  { href: "/admin/dispatch", label: "Dispatch Board", icon: Radar },
  { href: "/admin/trips", label: "Active Trips", icon: Navigation },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/support", label: "Help & Support", icon: LifeBuoy },
];
