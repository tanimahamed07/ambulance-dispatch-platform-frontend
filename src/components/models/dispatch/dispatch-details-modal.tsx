"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { format } from "date-fns";
import { Loader2, CheckCircle, XCircle, Clock, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import {
  useGetDispatchDetails,
  useAcceptDispatch,
  useRejectDispatch,
} from "@/hooks/dispatch.hooks";
import type { DispatchStatus, Priority } from "@/types/emergency.type";

interface DispatchDetailsModalProps {
  dispatchId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_CONFIG: Record<
  DispatchStatus,
  {
    icon: typeof Clock;
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  PENDING: {
    icon: Clock,
    variant: "secondary",
    label: "Pending",
  },
  ACCEPTED: {
    icon: CheckCircle,
    variant: "default",
    label: "Accepted",
  },
  REJECTED: {
    icon: XCircle,
    variant: "destructive",
    label: "Rejected",
  },
  CANCELLED: {
    icon: XCircle,
    variant: "outline",
    label: "Cancelled",
  },
  COMPLETED: {
    icon: XCircle,
    variant: "default",
    label: "Completed",
  },
};

const PRIORITY_CONFIG: Record<
  Priority,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  LOW: { variant: "outline", label: "Low" },
  MEDIUM: { variant: "secondary", label: "Medium" },
  HIGH: { variant: "default", label: "High" },
  CRITICAL: { variant: "destructive", label: "Critical" },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

const fmtDateTime = (date: string | Date | null | undefined) =>
  date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : null;

export function DispatchDetailsModal({
  dispatchId,
  isOpen,
  onOpenChange,
}: DispatchDetailsModalProps) {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const {
    data: response,
    isLoading,
    error,
  } = useGetDispatchDetails(dispatchId, isOpen);

  const { mutate: acceptDispatch } = useAcceptDispatch();
  const { mutate: rejectDispatch } = useRejectDispatch();

  // response?.data is DispatchDetailResponse
  const dispatch = response?.data;
  const statusConfig = dispatch ? STATUS_CONFIG[dispatch.status] : null;
  const priorityConfig = dispatch?.emergency.priority
    ? PRIORITY_CONFIG[dispatch.emergency.priority]
    : null;

  const handleAccept = () => {
    if (!dispatchId) return;

    setIsAccepting(true);
    acceptDispatch(dispatchId, {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Success",
          description: "Dispatch accepted successfully. Trip has been created.",
        });
        setIsAccepting(false);
        onOpenChange(false);
        // Redirect to my trips page
        router.push("/driver/my-trip");
      },
      onError: (error: any) => {
        toast.add({
          type: "error",
          title: "Error",
          description: error?.message || "Failed to accept dispatch request",
        });
        setIsAccepting(false);
      },
    });
  };

  const handleReject = () => {
    if (!dispatchId) return;

    setIsRejecting(true);
    rejectDispatch(dispatchId, {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Success",
          description:
            "Dispatch rejected. The dispatcher will reassign another driver.",
        });
        setIsRejecting(false);
        onOpenChange(false);
      },
      onError: (error: any) => {
        toast.add({
          type: "error",
          title: "Error",
          description: error?.message || "Failed to reject dispatch request",
        });
        setIsRejecting(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Dispatch Request Details
            </span>
            {statusConfig && (
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {dispatch
              ? `${dispatch.driver?.user.name || "Driver"} • ${dispatch.ambulance?.ambulanceNumber || "Ambulance"}`
              : "Loading details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="py-6 space-y-3">
            <p className="text-center text-sm text-destructive">
              Failed to load dispatch details. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !error && dispatch && statusConfig && (
          <div className="space-y-4 py-2">
            {/* Driver Information */}
            {dispatch.driver && (
              <Section title="Driver Information">
                <Row label="Driver Name" value={dispatch.driver.user.name} />
                <Row label="Email" value={dispatch.driver.user.email} />
              </Section>
            )}

            {/* Ambulance Information */}
            {dispatch.ambulance && (
              <Section title="Ambulance Information">
                <Row
                  label="Ambulance Number"
                  value={
                    <code className="text-sm font-mono">
                      {dispatch.ambulance.ambulanceNumber}
                    </code>
                  }
                />
                <Row
                  label="Vehicle Type"
                  value={dispatch.ambulance.vehicleType}
                />
                <Row
                  label="Ambulance Status"
                  value={
                    <Badge variant="outline">{dispatch.ambulance.status}</Badge>
                  }
                />
              </Section>
            )}

            {/* Patient Information */}
            <Section title="Patient Information">
              <Row
                label="Patient Name"
                value={dispatch.emergency.patientName}
              />
              <Row
                label="Contact Number"
                value={
                  <code className="text-sm font-mono">
                    {dispatch.emergency.patientPhone}
                  </code>
                }
              />
              <Row
                label="Caller Name"
                value={dispatch.emergency.caller?.user?.name || "N/A"}
              />
              <Row
                label="Caller Email"
                value={dispatch.emergency.caller?.user?.email || "N/A"}
              />
            </Section>

            {/* Emergency Details */}
            <Section title="Emergency Details">
              <Row
                label="Emergency Type"
                value={dispatch.emergency.emergencyType.replace(/_/g, " ")}
              />
              <Row
                label="Priority Level"
                value={
                  priorityConfig && (
                    <Badge variant={priorityConfig.variant}>
                      {priorityConfig.label}
                    </Badge>
                  )
                }
              />
              <Row
                label="Emergency Status"
                value={dispatch.emergency.status.replace(/_/g, " ")}
              />
              <Row
                label="Requested At"
                value={fmtDateTime(dispatch.emergency.createdAt) || "N/A"}
              />
              {dispatch.emergency.description && (
                <div className="pt-2 text-sm space-y-1">
                  <p className="text-muted-foreground">Description:</p>
                  <p className="font-medium rounded-lg bg-muted p-3">
                    {dispatch.emergency.description}
                  </p>
                </div>
              )}
            </Section>

            {/* Location Information */}
            <Section title="Location Details">
              <Row
                label="Pickup Address"
                value={dispatch.emergency.pickupAddress}
              />
              {dispatch.emergency.destination && (
                <Row
                  label="Destination"
                  value={dispatch.emergency.destination}
                />
              )}
            </Section>

            {/* Accepted Info */}
            {dispatch.acceptedAt && (
              <Section title="Dispatch Timeline">
                <Row
                  label="Dispatched"
                  value={fmtDateTime(dispatch.dispatchedAt) || "N/A"}
                />
                <Row
                  label="Accepted"
                  value={
                    <span className="inline-flex items-center gap-1.5 text-green-700 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      {fmtDateTime(dispatch.acceptedAt)}
                    </span>
                  }
                />
              </Section>
            )}

            {/* Action Buttons - Only show for PENDING status */}
            {dispatch.status === "PENDING" && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleReject}
                  disabled={isRejecting || isAccepting}
                >
                  {isRejecting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
                <Button
                  className="w-full"
                  onClick={handleAccept}
                  disabled={isAccepting || isRejecting}
                >
                  {isAccepting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Accept
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
