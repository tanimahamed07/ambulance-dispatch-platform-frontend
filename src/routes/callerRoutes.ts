import {
  AlertCircle,
  Car,
  CreditCard,
  LayoutDashboard,
  PhoneCall,
  User,
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
  {
    href: `${prefix}/payment-history`,
    label: "Payment History",
    icon: CreditCard,
  },
  {
    href: `${prefix}/apply-driver`,
    label: "Apply as Driver",
    icon: Car,
  },
  { href: `${prefix}/profile`, label: "Profile", icon: User },
];
