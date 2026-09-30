import {
  Ambulance,
  LayoutDashboard,
  LifeBuoy,
  Navigation,
  Route,
} from "lucide-react";
import type { SidebarItems } from "@/types";

export const driverRoutes: SidebarItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/trips", label: "My Trips", icon: Navigation },
  { href: "/dashboard/route", label: "My Route", icon: Route },
  { href: "/dashboard/vehicle", label: "My Vehicle", icon: Ambulance },
  { href: "/dashboard/support", label: "Help & Support", icon: LifeBuoy },
];
