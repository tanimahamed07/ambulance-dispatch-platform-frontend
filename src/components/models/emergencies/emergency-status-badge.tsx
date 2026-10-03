import type { LucideIcon } from "lucide-react";
import { Activity, CheckCircle, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { EmergencyStatus } from "@/types/emergency.type";

const STATUS_CONFIG: Record<
  EmergencyStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: LucideIcon;
  }
> = {
  PENDING: { label: "Pending", variant: "outline", icon: Clock },
  ASSIGNED: { label: "Assigned", variant: "secondary", icon: Activity },
  DISPATCHED: { label: "Dispatched", variant: "secondary", icon: Activity },
  EN_ROUTE: { label: "En Route", variant: "secondary", icon: Activity },
  IN_PROGRESS: { label: "In Progress", variant: "default", icon: Activity },
  PICKED_UP: { label: "Picked Up", variant: "default", icon: CheckCircle },
  COMPLETED: { label: "Completed", variant: "default", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

export default function EmergencyStatusBadge({
  status,
}: {
  status: EmergencyStatus;
}) {
  const config = STATUS_CONFIG[status];

  // Fallback if status is not found
  if (!config) {
    return (
      <Badge variant="outline" className="w-fit gap-1.5">
        <Clock className="h-3 w-3" />
        {status}
      </Badge>
    );
  }

  const { label, variant, icon: Icon } = config;

  return (
    <Badge variant={variant} className="w-fit gap-1.5">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
