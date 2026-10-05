import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/api/payment.api";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  UNPAID: {
    label: "Unpaid",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
};

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge className={config.className}>{config.label}</Badge>;
}
