import {
  Ambulance,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Navigation,
  Radar,
} from "lucide-react";
import type { SidebarItems } from "@/types";

export const dispatcherRoutes: SidebarItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/dispatch", label: "Dispatch Board", icon: Radar },
  { href: "/dashboard/trips", label: "Active Trips", icon: Navigation },
  { href: "/dashboard/fleet", label: "Fleet", icon: Ambulance },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/support", label: "Help & Support", icon: LifeBuoy },
];
