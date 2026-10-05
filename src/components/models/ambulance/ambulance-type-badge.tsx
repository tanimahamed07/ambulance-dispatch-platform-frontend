import { Badge } from "@/components/ui/badge";
import type { AmbulanceType } from "@/types/ambulence.type";

const TYPE_CONFIG: Record<AmbulanceType, { label: string; icon: string }> = {
  AC: { label: "AC", icon: "❄️" },
  NON_AC: { label: "Non-AC", icon: "🌡️" },
  ICU: { label: "ICU", icon: "🏥" },
  FREEZER: { label: "Freezer", icon: "🧊" },
  AIR: { label: "Air", icon: "✈️" },
};

export default function AmbulanceTypeBadge({ type }: { type: AmbulanceType }) {
  const config = TYPE_CONFIG[type];

  return (
    <Badge variant="outline">
      {config.icon} {config.label}
    </Badge>
  );
}
