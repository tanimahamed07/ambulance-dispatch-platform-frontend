import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/types/emergency.type";

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; className: string }
> = {
  CRITICAL: {
    label: "Critical",
    className: "bg-red-500/10 text-red-700 border-red-500/20",
  },
  HIGH: {
    label: "High",
    className: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  },
  LOW: {
    label: "Low",
    className: "bg-green-500/10 text-green-700 border-green-500/20",
  },
};

interface EmergencyPriorityBadgeProps {
  priority: Priority;
}

export default function EmergencyPriorityBadge({
  priority,
}: EmergencyPriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
