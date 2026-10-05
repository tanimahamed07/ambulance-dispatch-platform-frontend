"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import type { Emergency, EmergencyType } from "@/types/emergency.type";
import EmergencyPriorityBadge from "./emergency-priority-badge";
import EmergencyStatusBadge from "./emergency-status-badge";
import { CallerEmergencyModal } from "./caller-emergency-modal";
import { useInitiatePayment } from "@/hooks/payment.hooks";

const EMERGENCY_TYPE_LABELS: Record<
  EmergencyType,
  { label: string; icon: string }
> = {
  ACCIDENT: { label: "Accident", icon: "🚗" },
  CARDIAC: { label: "Cardiac", icon: "❤️" },
  PREGNANCY: { label: "Pregnancy", icon: "🤰" },
  TRAUMA: { label: "Trauma", icon: "🩹" },
  BREATHING_PROBLEM: { label: "Breathing", icon: "🫁" },
  STROKE: { label: "Stroke", icon: "🧠" },
  OTHER: { label: "Other", icon: "🏥" },
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <AlertCircle className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No emergencies found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try changing the filters or make a new request.
      </p>
    </div>
  );
}

export default function EmergenciesTable({
  emergencies,
}: {
  emergencies: Emergency[];
  basePath?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: initiatePayment } = useInitiatePayment();

  const handleOpenDetails = (emergency: Emergency) => {
    setSelectedId(emergency.id);
    setIsOpen(true);
  };

  const handlePay = (tripId: string) => {
    initiatePayment(
      { tripId },
      {
        onSuccess: (response) => {
          const paymentUrl = response.data?.paymentUrl;
          if (paymentUrl) {
            toast.add({
              type: "success",
              title: "Redirecting to Payment",
              description: "Please complete your payment on bKash",
            });
            // Redirect to bKash payment page
            window.location.href = paymentUrl;
          } else {
            toast.add({
              type: "error",
              title: "Error",
              description: "Payment URL not received",
            });
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to initiate payment";

          // Check if it's the "already pending" error
          if (
            errorMessage.includes("Already Have A Pending Payment") ||
            errorMessage.includes("already have a pending payment")
          ) {
            toast.add({
              type: "warning",
              title: "Payment Already Pending",
              description:
                "You already have a pending payment. Please check your bKash app or contact support to complete the pending payment.",
            });
          } else {
            toast.add({
              type: "error",
              title: "Payment Failed",
              description: errorMessage,
            });
          }
        },
      },
    );
  };

  if (emergencies.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ambulance</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {emergencies.map((emergency) => {
              const type = EMERGENCY_TYPE_LABELS[emergency.emergencyType];
              const { dispatch } = emergency as Emergency & {
                dispatch?: {
                  status: string;
                };
              };

              return (
                <TableRow key={emergency.id}>
                  <TableCell>
                    <p className="font-medium">{emergency.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {emergency.patientPhone}
                    </p>
                  </TableCell>

                  <TableCell>
                    {type.icon} {type.label}
                  </TableCell>

                  <TableCell>
                    <EmergencyPriorityBadge priority={emergency.priority} />
                  </TableCell>

                  <TableCell>
                    <EmergencyStatusBadge status={emergency.status} />
                  </TableCell>

                  <TableCell>
                    {dispatch ? (
                      <div className="space-y-1">
                        <p className="font-medium">{dispatch.status}</p>

                        <Badge variant="outline">{dispatch.status}</Badge>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not Assigned
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(emergency.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDetails(emergency)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Emergency Detail Modal */}
      <CallerEmergencyModal
        emergencyId={selectedId}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onPay={handlePay}
      />
    </>
  );
}
