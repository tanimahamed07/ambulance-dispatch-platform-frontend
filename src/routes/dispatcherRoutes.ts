import {
  Ambulance,
  AlertCircle,
  LayoutDashboard,
  Users,
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
];
