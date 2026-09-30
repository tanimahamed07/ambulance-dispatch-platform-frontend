import {
  AlertCircle,
  LayoutDashboard,
  PhoneCall,
  Settings,
} from "lucide-react";
import type { SidebarItems } from "@/types";

const prefix = "/caller";

export const callerRoutes: SidebarItems = [
  { href: prefix, label: "Overview", icon: LayoutDashboard, exact: true },
  {
    href: `${prefix}/request`,
    label: "Request Ambulance",
    icon: AlertCircle,
  },
  {
    href: `${prefix}/my-emergencies`,
    label: "My Emergencies",
    icon: PhoneCall,
  },
  { href: `${prefix}/settings`, label: "Settings", icon: Settings },
];
