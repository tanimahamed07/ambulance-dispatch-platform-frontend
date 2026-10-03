"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { format } from "date-fns";
import {
  Loader2,
  Activity,
  MapPin,
  Calendar,
  DollarSign,
  Hospital,
  User,
  Phone,
  Navigation,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import {
  useGetMyTripDetails,
  useMarkTripEnRoute,
  useMarkTripPickedUp,
} from "@/hooks/trip.hooks";
import type {
  Priority,
  TripStatus,
  PaymentStatus,
} from "@/types/emergency.type";

interface TripDetailsModalProps {
  tripId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TRIP_STATUS_CONFIG: Record<
  TripStatus,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  DISPATCHED: { variant: "secondary", label: "Dispatched" },
  EN_ROUTE: { variant: "default", label: "En Route" },
  PICKED_UP: { variant: "default", label: "Picked Up" },
  AT_HOSPITAL: { variant: "secondary", label: "At Hospital" },
  COMPLETED: { variant: "outline", label: "Completed" },
  CANCELLED: { variant: "destructive", label: "Cancelled" },
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

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  UNPAID: { variant: "outline", label: "Unpaid" },
  PENDING: { variant: "secondary", label: "Pending" },
  COMPLETED: { variant: "default", label: "Completed" },
  FAILED: { variant: "destructive", label: "Failed" },
  CANCELLED: { variant: "outline", label: "Cancelled" },
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

export function TripDetailsModal({
  tripId,
  isOpen,
  onOpenChange,
}: TripDetailsModalProps) {
  const [selectedAction, setSelectedAction] = useState<string>("");

  const {
    data: response,
    isLoading,
    error,
  } = useGetMyTripDetails(tripId, isOpen);

  const { mutate: markEnRoute, isPending: isMarkingEnRoute } =
    useMarkTripEnRoute();
  const { mutate: markPickedUp, isPending: isMarkingPickedUp } =
    useMarkTripPickedUp();

  const trip = response?.data;
  const statusConfig = trip ? TRIP_STATUS_CONFIG[trip.status] : null;
  const priorityConfig = trip?.emergency.priority
    ? PRIORITY_CONFIG[trip.emergency.priority]
    : null;
  const paymentConfig = trip?.payment?.status
    ? PAYMENT_STATUS_CONFIG[trip.payment.status]
    : null;

  const canUpdateStatus =
    trip && !["COMPLETED", "CANCELLED"].includes(trip.status);

  const handleStatusChange = (value: string) => {
    if (!tripId) return;

    setSelectedAction(value);

    if (value === "EN_ROUTE") {
      markEnRoute(tripId, {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Trip status updated to En Route",
          });
          setSelectedAction("");
        },
        onError: (error: any) => {
          toast.add({
            type: "error",
            title: "Error",
            description: error?.message || "Failed to update trip status",
          });
          setSelectedAction("");
        },
      });
    } else if (value === "PICKED_UP") {
      markPickedUp(tripId, {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Trip status updated to Picked Up",
          });
          setSelectedAction("");
        },
        onError: (error: any) => {
          toast.add({
            type: "error",
            title: "Error",
            description: error?.message || "Failed to update trip status",
          });
          setSelectedAction("");
        },
      });
    }
  };

  const getAvailableActions = () => {
    if (!trip) return [];

    if (trip.status === "DISPATCHED") {
      return [
        {
          value: "EN_ROUTE",
          label: "Mark as En Route",
          icon: Navigation,
        },
      ];
    }

    if (trip.status === "EN_ROUTE") {
      return [
        {
          value: "PICKED_UP",
          label: "Mark as Picked Up",
          icon: Package,
        },
      ];
    }

    return [];
  };

  const availableActions = getAvailableActions();
  const isUpdating = isMarkingEnRoute || isMarkingPickedUp;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Trip Details
            </span>
            {statusConfig && (
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {trip
              ? `${trip.emergency.patientName} • ${trip.emergency.emergencyType.replace(/_/g, " ")}`
              : "Loading trip details..."}
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
              Failed to load trip details. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !error && trip && (
          <div className="space-y-4 py-2">
            {/* Status Update Action */}
            {canUpdateStatus && availableActions.length > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Label
                  htmlFor="status-action"
                  className="text-sm font-medium mb-2 block"
                >
                  Update Trip Status
                </Label>
                <Select
                  value={selectedAction}
                  onValueChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <SelectTrigger id="status-action" className="w-full">
                    <SelectValue placeholder="Select an action..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <SelectItem key={action.value} value={action.value}>
                          <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {action.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {isUpdating && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Updating trip status...
                  </p>
                )}
              </div>
            )}

            {/* Patient Information */}
            <Section title="Patient Information">
              <Row
                label="Patient Name"
                value={
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {trip.emergency.patientName}
                  </span>
                }
              />
              <Row
                label="Contact Number"
                value={
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <code className="text-sm font-mono">
                      {trip.emergency.patientPhone}
                    </code>
                  </span>
                }
              />
            </Section>

            {/* Caller Information */}
            {trip.emergency.caller && (
              <Section title="Caller Information">
                <Row
                  label="Caller Name"
                  value={trip.emergency.caller.user.name}
                />
                <Row label="Email" value={trip.emergency.caller.user.email} />
                {trip.emergency.caller.contactNumber && (
                  <Row
                    label="Contact"
                    value={
                      <code className="text-sm font-mono">
                        {trip.emergency.caller.contactNumber}
                      </code>
                    }
                  />
                )}
                {trip.emergency.caller.bloodGroup && (
                  <Row
                    label="Blood Group"
                    value={trip.emergency.caller.bloodGroup}
                  />
                )}
                {trip.emergency.caller.address && (
                  <Row label="Address" value={trip.emergency.caller.address} />
                )}
              </Section>
            )}

            {/* Emergency Details */}
            <Section title="Emergency Details">
              <Row
                label="Emergency Type"
                value={trip.emergency.emergencyType.replace(/_/g, " ")}
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
                value={
                  <Badge variant="outline" className="capitalize">
                    {trip.emergency.status.replace(/_/g, " ").toLowerCase()}
                  </Badge>
                }
              />
              {trip.emergency.description && (
                <div className="pt-2 text-sm space-y-1">
                  <p className="text-muted-foreground">Description:</p>
                  <p className="font-medium rounded-lg bg-muted p-3">
                    {trip.emergency.description}
                  </p>
                </div>
              )}
            </Section>

            {/* Location Information */}
            <Section title="Location Details">
              <Row
                label="Pickup Address"
                value={
                  <span className="flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span className="text-right">
                      {trip.emergency.pickupAddress}
                    </span>
                  </span>
                }
              />
              <Row
                label="Coordinates"
                value={`${trip.emergency.pickupLatitude.toFixed(6)}, ${trip.emergency.pickupLongitude.toFixed(6)}`}
              />
            </Section>

            {/* Hospital Information */}
            {trip.hospital && (
              <Section title="Hospital Information">
                <Row
                  label="Hospital Name"
                  value={
                    <span className="flex items-center gap-1.5">
                      <Hospital className="h-3.5 w-3.5" />
                      {trip.hospital.name}
                    </span>
                  }
                />
                <Row
                  label="Contact"
                  value={
                    <code className="text-sm font-mono">
                      {trip.hospital.phone}
                    </code>
                  }
                />
                <Row label="Address" value={trip.hospital.address} />
              </Section>
            )}

            {/* Trip Timeline */}
            <Section title="Trip Timeline">
              <Row
                label="Started At"
                value={
                  trip.startedAt ? (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {fmtDateTime(trip.startedAt)}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
              />
              <Row
                label="Picked Up At"
                value={
                  trip.pickedUpAt ? (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {fmtDateTime(trip.pickedUpAt)}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
              />
              <Row
                label="Hospital Arrival"
                value={
                  trip.hospitalArrivalAt ? (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {fmtDateTime(trip.hospitalArrivalAt)}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
              />
              <Row
                label="Completed At"
                value={
                  trip.completedAt ? (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {fmtDateTime(trip.completedAt)}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
              />
            </Section>

            {/* Trip Metrics */}
            <Section title="Trip Metrics">
              <Row
                label="Distance"
                value={
                  trip.distanceKm ? `${trip.distanceKm.toFixed(2)} km` : "N/A"
                }
              />
              <Row
                label="Fare"
                value={
                  trip.fare ? (
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5" />
                      {trip.fare} BDT
                    </span>
                  ) : (
                    "N/A"
                  )
                }
              />
            </Section>

            {/* Payment Information */}
            {trip.payment && (
              <Section title="Payment Information">
                <Row
                  label="Status"
                  value={
                    paymentConfig && (
                      <Badge variant={paymentConfig.variant}>
                        {paymentConfig.label}
                      </Badge>
                    )
                  }
                />
                <Row
                  label="Amount"
                  value={`${trip.payment.amount} ${trip.payment.currency}`}
                />
                {trip.payment.trxID && (
                  <Row
                    label="Transaction ID"
                    value={
                      <code className="text-xs font-mono">
                        {trip.payment.trxID}
                      </code>
                    }
                  />
                )}
                {trip.payment.paymentExecuteTime && (
                  <Row
                    label="Payment Time"
                    value={fmtDateTime(trip.payment.paymentExecuteTime)}
                  />
                )}
                {trip.payment.failureReason && (
                  <div className="pt-2 text-sm space-y-1">
                    <p className="text-muted-foreground">Failure Reason:</p>
                    <p className="font-medium rounded-lg bg-destructive/10 text-destructive p-3">
                      {trip.payment.failureReason}
                    </p>
                  </div>
                )}
              </Section>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
