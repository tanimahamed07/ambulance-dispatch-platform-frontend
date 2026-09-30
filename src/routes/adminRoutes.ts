import {
  Ambulance,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Navigation,
  Radar,
  Settings,
  Users,
} from "lucide-react";
import type { SidebarItems } from "@/types";

export const adminRoutes: SidebarItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/dispatch", label: "Dispatch Board", icon: Radar },
  { href: "/dashboard/trips", label: "Active Trips", icon: Navigation },
  { href: "/dashboard/fleet", label: "Fleet", icon: Ambulance },
  { href: "/dashboard/drivers", label: "Drivers", icon: Users },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/support", label: "Help & Support", icon: LifeBuoy },
];
