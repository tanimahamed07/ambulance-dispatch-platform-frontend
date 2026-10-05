import {
  Ambulance,
  AlertCircle,
  LayoutDashboard,
  Users,
  User,
  Settings,
} from "lucide-react";
import type { SidebarItems } from "@/types";

const prefix = "/dispatcher";

export const dispatcherRoutes: SidebarItems = [
  { href: prefix, label: "Overview", icon: LayoutDashboard, exact: true },
  {
    href: `${prefix}/emergencies`,
    label: "Emergencies",
    icon: AlertCircle,
  },
  { href: `${prefix}/drivers`, label: "Drivers", icon: Users },
  { href: `${prefix}/profile`, label: "Profile", icon: User },
  { href: `${prefix}/settings`, label: "Settings", icon: Settings },
];
