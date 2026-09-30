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
  IN_PROGRESS: { label: "In Progress", variant: "default", icon: Activity },
  COMPLETED: { label: "Completed", variant: "default", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

export default function EmergencyStatusBadge({
  status,
}: {
  status: EmergencyStatus;
}) {
  const { label, variant, icon: Icon } = STATUS_CONFIG[status];

  return (
    <Badge variant={variant} className="w-fit gap-1.5">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
