import { Badge } from "@/components/ui/badge";
import type { AmbulanceStatus } from "@/types/ambulence.type";

const STATUS_CONFIG: Record<
  AmbulanceStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  AVAILABLE: { label: "Available", variant: "default" },
  ASSIGNED: { label: "Assigned", variant: "secondary" },
  EN_ROUTE: { label: "En Route", variant: "secondary" },
  OFFLINE: { label: "Offline", variant: "outline" },
  MAINTENANCE: { label: "Maintenance", variant: "destructive" },
};

export default function AmbulanceStatusBadge({
  status,
}: {
  status: AmbulanceStatus;
}) {
  const config = STATUS_CONFIG[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
