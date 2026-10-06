import {
  Ambulance,
  LayoutDashboard,
  Users,
  UserCheck,
  Hospital,
  User,
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
  {
    href: "/admin/hospitals",
    label: "Hospital Management",
    icon: Hospital,
  },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/profile", label: "Profile", icon: User },
];
