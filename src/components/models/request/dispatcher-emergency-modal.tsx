"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { CheckCircle2, Circle, Loader2, UserPlus } from "lucide-react";

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

import type { EmergencyTrip } from "@/types/emergency.type";
import type { DispatchableDriver } from "@/types/driver.type";
import EmergencyPriorityBadge from "../emergencies/emergency-priority-badge";
import EmergencyStatusBadge from "../emergencies/emergency-status-badge";
import { useGetEmergencyDetails } from "@/hooks";
import { useGetDispatchableDrivers } from "@/hooks/driver.hooks";
import { useCreateDispatch } from "@/hooks/emergency.hooks";

interface DispatcherEmergencyModalProps {
  emergencyId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const fmt = (date: string | null) =>
  date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : null;

// Used both inside the Select trigger and inside each dropdown item
function DriverOption({ driver }: { driver: DispatchableDriver }) {
  return (
    <div className="flex w-full items-center gap-3 text-left">
      {driver.user?.profilePicture ? (
        <img
          src={driver.user.profilePicture}
          alt={driver.user.name}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          {driver.user?.name.charAt(0).toUpperCase() || "?"}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {driver.user?.name || "Unknown"}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {driver.licenseNumber} · {driver.contactNumber}
        </p>
      </div>
    </div>
  );
}

function TripTimeline({ trip }: { trip: EmergencyTrip }) {
  const steps = [
    { label: "Trip started", at: trip.startedAt },
    { label: "Patient picked up", at: trip.pickedUpAt },
    { label: "Arrived at hospital", at: trip.hospitalArrivalAt },
    { label: "Trip completed", at: trip.completedAt },
  ];

  return (
    <ul className="space-y-2">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center gap-2 text-sm">
          {step.at ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={step.at ? "font-medium" : "text-muted-foreground"}>
            {step.label}
          </span>
          {step.at && (
            <span className="ml-auto text-xs text-muted-foreground">
              {fmt(step.at)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function DispatcherEmergencyModal({
  emergencyId,
  isOpen,
  onOpenChange,
}: DispatcherEmergencyModalProps) {
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);

  const { data, isLoading, isError, error } = useGetEmergencyDetails(
    emergencyId,
    isOpen,
  );

  const { data: driversData, isLoading: driversLoading } =
    useGetDispatchableDrivers({
      isAvailable: true,
      limit: 100,
    });

  const { mutate: createDispatchMutation } = useCreateDispatch();

  const emergency = data?.data;
  const dispatch = emergency?.dispatch ?? null;
  const trip = dispatch?.trips ?? null;

  const canAssignDriver = emergency?.status === "PENDING" && !dispatch;

  const availableDrivers: DispatchableDriver[] = driversData?.data || [];
  const selectedDriver = availableDrivers.find(
    (d) => d.id === selectedDriverId,
  );

  const handleAssignDriver = () => {
    if (!selectedDriverId || !emergencyId) return;

    setIsAssigning(true);

    createDispatchMutation(
      {
        emergencyId,
        driverId: selectedDriverId,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Driver assigned to emergency successfully",
          });

          setSelectedDriverId("");
          setIsAssigning(false);
          setShowAssignForm(false);

          onOpenChange(false);
        },

        onError: (error: any) => {
          toast.add({
            title: "Error",
            description:
              error?.message || "Failed to assign driver to emergency",
            type: "error",
          });
          setIsAssigning(false);
        },
      },
    );
  };

  const handleCancelAssign = () => {
    setShowAssignForm(false);
    setSelectedDriverId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span>Emergency Details</span>
            {emergency && <EmergencyStatusBadge status={emergency.status} />}
          </DialogTitle>
          <DialogDescription>
            {emergency
              ? `Requested ${formatDistanceToNow(
                  new Date(emergency.createdAt),
                  {
                    addSuffix: true,
                  },
                )}`
              : "Loading details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <p className="py-6 text-center text-sm text-destructive">
            {(error as Error)?.message || "Failed to load emergency details."}
          </p>
        )}

        {emergency && (
          <div className="space-y-4 py-2">
            {/* Patient */}
            <Section title="Patient Information">
              <p className="font-medium text-base">{emergency.patientName}</p>
              <p className="text-sm text-muted-foreground">
                {emergency.patientPhone}
              </p>
            </Section>

            {/* Type + Priority */}
            <div className="grid grid-cols-2 gap-4">
              <Section title="Type">
                <p className="font-medium">{emergency.emergencyType}</p>
              </Section>
              <Section title="Priority">
                <EmergencyPriorityBadge priority={emergency.priority} />
              </Section>
            </div>

            {/* Pickup */}
            <Section title="Pickup Address">
              <p className="text-sm">{emergency.pickupAddress}</p>
              {emergency.description && (
                <p className="text-sm text-muted-foreground pt-1">
                  {emergency.description}
                </p>
              )}
            </Section>

            {emergency.status === "CANCELLED" && (
              <Section title="Cancellation">
                <Row label="Reason" value={emergency.cancellationReason} />
                <Row label="Cancelled at" value={fmt(emergency.cancelledAt)} />
              </Section>
            )}

            {/* Caller Information */}
            {emergency.caller && (
              <Section title="Caller Information">
                <Row label="Name" value={emergency.caller.user.name} />
                <Row label="Email" value={emergency.caller.user.email} />
                <Row label="Phone" value={emergency.caller.contactNumber} />
                <Row label="Blood group" value={emergency.caller.bloodGroup} />
                <Row label="Address" value={emergency.caller.address} />
              </Section>
            )}

            {/* Dispatch */}
            <Section title="Dispatch Information">
              {dispatch ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {dispatch.ambulance.ambulanceNumber}
                    </p>
                    <Badge variant="outline">{dispatch.status}</Badge>
                  </div>
                  <Row label="Vehicle" value={dispatch.ambulance.model} />
                  <Row label="Type" value={dispatch.ambulance.vehicleType} />
                  <Row
                    label="Registration"
                    value={dispatch.ambulance.registrationNumber}
                  />
                  <Row label="Driver" value={dispatch.driver.user.name} />
                  <Row
                    label="Driver phone"
                    value={dispatch.driver.contactNumber}
                  />
                  <Row
                    label="Driver email"
                    value={dispatch.driver.user.email}
                  />
                  <Row label="Dispatched" value={fmt(dispatch.dispatchedAt)} />
                  <Row label="Accepted" value={fmt(dispatch.acceptedAt)} />
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-3">
                    No ambulance assigned yet.
                  </p>
                  {canAssignDriver && !showAssignForm && (
                    <Button
                      onClick={() => setShowAssignForm(true)}
                      className="w-full"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Driver
                    </Button>
                  )}

                  {canAssignDriver && showAssignForm && (
                    <div className="space-y-3">
                      {driversLoading ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : availableDrivers.length > 0 ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="driverSelect">
                              Select Available Driver{" "}
                              <span className="text-destructive">*</span>
                            </Label>

                            <Select
                              value={selectedDriverId || null}
                              onValueChange={(value) =>
                                setSelectedDriverId(value ?? "")
                              }
                            >
                              <SelectTrigger
                                id="driverSelect"
                                className="h-auto min-h-12 w-full py-2"
                              >
                                <SelectValue>
                                  {() =>
                                    selectedDriver ? (
                                      <DriverOption driver={selectedDriver} />
                                    ) : (
                                      <span className="text-muted-foreground">
                                        Choose a driver from the list
                                      </span>
                                    )
                                  }
                                </SelectValue>
                              </SelectTrigger>

                              <SelectContent
                                alignItemWithTrigger={false}
                                sideOffset={6}
                                className="max-h-72 w-(--anchor-width)"
                              >
                                {availableDrivers.map((driver) => (
                                  <SelectItem
                                    key={driver.id}
                                    value={driver.id}
                                    className="py-2.5"
                                  >
                                    <DriverOption driver={driver} />
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {/* Driver count info */}
                            <p className="text-xs text-muted-foreground">
                              {availableDrivers.length} available{" "}
                              {availableDrivers.length === 1
                                ? "driver"
                                : "drivers"}{" "}
                              found
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <Button
                              variant="outline"
                              onClick={handleCancelAssign}
                              disabled={isAssigning}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleAssignDriver}
                              disabled={!selectedDriverId || isAssigning}
                            >
                              {isAssigning ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <UserPlus className="h-4 w-4 mr-2" />
                              )}
                              Confirm
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          <p>No available drivers found</p>
                          <p className="text-xs mt-1">
                            All approved drivers are currently assigned or
                            unavailable
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </Section>

            {/* Trip */}
            {trip && (
              <Section title="Trip Progress">
                <TripTimeline trip={trip} />
                <div className="pt-2 space-y-1">
                  <Row label="Hospital" value={trip.hospital?.name} />
                  <Row
                    label="Hospital address"
                    value={trip.hospital?.address}
                  />
                  <Row
                    label="Distance"
                    value={
                      trip.distanceKm ? `${trip.distanceKm} km` : undefined
                    }
                  />
                  <Row
                    label="Fare"
                    value={trip.fare ? `${trip.fare} BDT` : undefined}
                  />
                </div>
              </Section>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
