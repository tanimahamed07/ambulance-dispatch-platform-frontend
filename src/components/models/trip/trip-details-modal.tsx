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
  CheckCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  useSelectHospital,
  useMarkHospitalArrival,
  useCompleteTrip,
  useCalculateTripFare,
} from "@/hooks/trip.hooks";
import { useGetHospitals } from "@/hooks/hospital.hooks";
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
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");
  const [distanceKm, setDistanceKm] = useState<string>("");
  const [showCompleteTripForm, setShowCompleteTripForm] = useState(false);

  const {
    data: response,
    isLoading,
    error,
  } = useGetMyTripDetails(tripId, isOpen);

  // Get all hospitals for selection
  const { data: hospitalsResponse } = useGetHospitals({
    page: 1,
    limit: 100,
    status: "ACTIVE",
    emergencyAvailable: true,
  });

  // Calculate fare when distance changes
  const distanceValue = parseFloat(distanceKm) || 0;
  const { data: fareResponse } = useCalculateTripFare(
    tripId,
    distanceValue,
    showCompleteTripForm && distanceValue >= 0.1,
  );

  const { mutate: markEnRoute, isPending: isMarkingEnRoute } =
    useMarkTripEnRoute();
  const { mutate: markPickedUp, isPending: isMarkingPickedUp } =
    useMarkTripPickedUp();
  const { mutate: selectHospital, isPending: isSelectingHospital } =
    useSelectHospital();
  const { mutate: markHospitalArrival, isPending: isMarkingHospitalArrival } =
    useMarkHospitalArrival();
  const { mutate: completeTrip, isPending: isCompletingTrip } =
    useCompleteTrip();

  const trip = response?.data;
  const hospitals = hospitalsResponse?.data?.data || [];

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

  const handleHospitalSelect = () => {
    if (!tripId || !selectedHospitalId) return;

    selectHospital(
      { tripId, hospitalId: selectedHospitalId },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Hospital selected successfully",
          });
          setSelectedHospitalId("");
        },
        onError: (error: any) => {
          toast.add({
            type: "error",
            title: "Error",
            description: error?.message || "Failed to select hospital",
          });
        },
      },
    );
  };

  const handleMarkHospitalArrival = () => {
    if (!tripId) return;

    markHospitalArrival(tripId, {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Success",
          description: "Marked arrival at hospital",
        });
      },
      onError: (error: any) => {
        toast.add({
          type: "error",
          title: "Error",
          description: error?.message || "Failed to mark hospital arrival",
        });
      },
    });
  };

  const handleCompleteTrip = () => {
    if (!tripId || !distanceKm) return;

    const distance = parseFloat(distanceKm);
    if (distance < 0.1 || distance > 500) {
      toast.add({
        type: "error",
        title: "Invalid Distance",
        description: "Distance must be between 0.1 and 500 km",
      });
      return;
    }

    completeTrip(
      { tripId, distanceKm: distance },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Trip Completed",
            description: "Trip has been completed successfully",
          });
          setShowCompleteTripForm(false);
          setDistanceKm("");
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.add({
            type: "error",
            title: "Error",
            description: error?.message || "Failed to complete trip",
          });
        },
      },
    );
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
  const isUpdating =
    isMarkingEnRoute ||
    isMarkingPickedUp ||
    isSelectingHospital ||
    isMarkingHospitalArrival ||
    isCompletingTrip;

  const showHospitalSelection = trip?.status === "PICKED_UP" && !trip.hospital;
  const showHospitalArrivalButton =
    trip?.status === "PICKED_UP" && !!trip.hospital;
  const showCompleteTripButton = trip?.status === "AT_HOSPITAL";

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

            {/* Hospital Selection */}
            {showHospitalSelection && (
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 space-y-3">
                <Label
                  htmlFor="hospital-select"
                  className="text-sm font-medium block"
                >
                  Select Hospital
                </Label>
                <Select
                  value={selectedHospitalId}
                  onValueChange={setSelectedHospitalId}
                  disabled={isSelectingHospital}
                >
                  <SelectTrigger id="hospital-select" className="w-full">
                    <SelectValue placeholder="Choose a hospital...">
                      {selectedHospitalId && hospitals.length > 0 && (
                        <span className="flex items-center gap-2">
                          <Hospital className="h-4 w-4" />
                          {hospitals.find((h) => h.id === selectedHospitalId)
                            ?.name || "Choose a hospital..."}
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        <span className="flex items-center gap-2">
                          <Hospital className="h-4 w-4" />
                          {hospital.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleHospitalSelect}
                  disabled={!selectedHospitalId || isSelectingHospital}
                  className="w-full"
                  size="sm"
                >
                  {isSelectingHospital && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirm Hospital Selection
                </Button>
              </div>
            )}

            {/* Hospital Arrival Button */}
            {showHospitalArrivalButton && (
              <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                <Button
                  onClick={handleMarkHospitalArrival}
                  disabled={isMarkingHospitalArrival}
                  className="w-full"
                  variant="default"
                >
                  {isMarkingHospitalArrival && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <MapPin className="mr-2 h-4 w-4" />
                  Mark Arrival at Hospital
                </Button>
              </div>
            )}

            {/* Complete Trip Section */}
            {showCompleteTripButton && (
              <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 space-y-3">
                {!showCompleteTripForm ? (
                  <Button
                    onClick={() => setShowCompleteTripForm(true)}
                    className="w-full"
                    variant="default"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Trip
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="distance" className="text-sm font-medium">
                        Trip Distance (km)
                      </Label>
                      <Input
                        id="distance"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="500"
                        placeholder="Enter distance in kilometers"
                        value={distanceKm}
                        onChange={(e) => setDistanceKm(e.target.value)}
                        disabled={isCompletingTrip}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the total distance traveled (0.1 - 500 km)
                      </p>
                    </div>

                    {fareResponse?.data && distanceValue >= 0.1 && (
                      <div className="rounded-lg border bg-muted/50 p-3 space-y-2">
                        <p className="text-sm font-medium">Fare Calculation</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Base Fare:
                            </span>
                            <span className="font-medium">
                              ৳{fareResponse.data.baseFare}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Distance: {fareResponse.data.distanceKm} km × ৳
                              {fareResponse.data.perKmRate}/km
                            </span>
                            <span className="font-medium">
                              ৳
                              {fareResponse.data.distanceKm *
                                fareResponse.data.perKmRate}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="font-medium">Total Fare:</span>
                            <span className="text-lg font-bold text-primary">
                              ৳{fareResponse.data.calculatedFare}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setShowCompleteTripForm(false);
                          setDistanceKm("");
                        }}
                        variant="outline"
                        className="flex-1"
                        disabled={isCompletingTrip}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCompleteTrip}
                        disabled={
                          !distanceKm ||
                          distanceValue < 0.1 ||
                          distanceValue > 500 ||
                          isCompletingTrip
                        }
                        className="flex-1"
                      >
                        {isCompletingTrip && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirm & Complete
                      </Button>
                    </div>
                  </>
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
