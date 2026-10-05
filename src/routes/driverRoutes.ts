import {
  Ambulance,
  LayoutDashboard,
  ClipboardList,
  MapPin,
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
    href: "/driver/my-trip",
    label: "My Trips",
    icon: MapPin,
  },
  {
    href: "/driver/payment-history",
    label: "Payment History",
    icon: History,
  },
];
