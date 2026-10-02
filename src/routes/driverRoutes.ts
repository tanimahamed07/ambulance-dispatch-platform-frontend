import {
  Ambulance,
  LayoutDashboard,
  ClipboardList,
  Navigation,
  History,
} from "lucide-react";
import type { SidebarItems } from "@/types";

export const driverRoutes: SidebarItems = [
  {
    href: "/driver",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/driver/dispatches",
    label: "Assigned Requests",
    icon: ClipboardList,
  },
  {
    href: "/driver/active-trip",
    label: "Active Trip",
    icon: Navigation,
  },
  {
    href: "/driver/history",
    label: "Trip History",
    icon: History,
  },
  {
    href: "/driver/ambulance",
    label: "My Ambulance",
    icon: Ambulance,
  },
];
