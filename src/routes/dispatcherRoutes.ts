import {
  Ambulance,
  AlertCircle,
  LayoutDashboard,
  Route,
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
  { href: `${prefix}/trips`, label: "Trips", icon: Route },
  { href: `${prefix}/fleet`, label: "Fleet", icon: Ambulance },
  { href: `${prefix}/settings`, label: "Settings", icon: Settings },
];
