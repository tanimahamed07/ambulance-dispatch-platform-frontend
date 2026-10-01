"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { format } from "date-fns";
import {
  Loader2,
  UserPlus,
  UserMinus,
  Truck,
  MapPin,
  AlertCircle,
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

import {
  useGetAmbulanceDetails,
  useAssignDriverWithAmbulance,
  useUnAssignDriverWithAmbulance,
} from "@/hooks/ambulance.hooks";
import { useGetAllDrivers } from "@/hooks/driver.hooks";
import { toast } from "@/components/ui/toast";
import AmbulanceStatusBadge from "./ambulance-status-badge";
import AmbulanceTypeBadge from "./ambulance-type-badge";

interface AmbulanceDetailsModalProps {
  ambulanceId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type DriverLite = {
  id: string;
  licenseNumber: string;
  contactNumber: string;
  user: { name: string; profileUrl?: string | null };
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

// Used both inside the Select trigger and inside each dropdown item
function DriverOption({ driver }: { driver: DriverLite }) {
  return (
    <div className="flex w-full items-center gap-3 text-left">
      {driver.user.profileUrl ? (
        <img
          src={driver.user.profileUrl}
          alt={driver.user.name}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          {driver.user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{driver.user.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {driver.licenseNumber} · {driver.contactNumber}
        </p>
      </div>
    </div>
  );
}

const fmt = (date: string | null) =>
  date ? format(new Date(date), "dd MMM yyyy") : null;

const fmtDateTime = (date: string | null) =>
  date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : null;

export function AmbulanceDetailsModal({
  ambulanceId,
  isOpen,
  onOpenChange,
}: AmbulanceDetailsModalProps) {
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [isUnassigning, setIsUnassigning] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);

  const { data, isLoading, error, refetch } =
    useGetAmbulanceDetails(ambulanceId);
  const ambulance = data?.data;

  const {
    data: driversData,
    isLoading: driversLoading,
    refetch: refetchDrivers,
  } = useGetAllDrivers({
    hasAmbulance: "false",
    approvalStatus: "APPROVED",
    limit: 100,
  });

  const { mutate: assignDriver } = useAssignDriverWithAmbulance();
  const { mutate: unassignDriver } = useUnAssignDriverWithAmbulance();

  const availableDrivers: DriverLite[] = driversData?.data?.data || [];
  const selectedDriver = availableDrivers.find(
    (d) => d.id === selectedDriverId,
  );

  const handleAssignDriver = () => {
    if (!selectedDriverId || !ambulanceId) return;

    setIsAssigning(true);

    assignDriver(
      {
        id: ambulanceId,
        payload: { driverId: selectedDriverId },
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Driver assigned to ambulance successfully",
          });

          setSelectedDriverId("");
          setIsAssigning(false);
          setShowAssignForm(false);

          // Fresh ambulance details + remove the assigned driver from the list
          refetch();
          refetchDrivers();

          onOpenChange(false);
        },

        onError: () => {
          toast.add({
            title: "Error",
            description: "Failed to assign driver to ambulance",
            type: "error",
          });
          setIsAssigning(false);
        },
      },
    );
  };

  const handleUnassignDriver = () => {
    if (!ambulance?.driver?.id || !ambulanceId) return;

    setIsUnassigning(true);

    unassignDriver(
      {
        id: ambulanceId,
        payload: { driverId: ambulance.driver.id },
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Driver unassigned from ambulance successfully",
          });

          setIsUnassigning(false);

          refetch();
          refetchDrivers();

          onOpenChange(false);
        },
        onError: () => {
          toast.add({
            title: "Error",
            description: "Failed to unassign driver from ambulance",
            type: "error",
          });
          setIsUnassigning(false);
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
            <span className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Ambulance Details
            </span>
            {ambulance && <AmbulanceStatusBadge status={ambulance.status} />}
          </DialogTitle>
          <DialogDescription>
            {ambulance
              ? `${ambulance.ambulanceNumber} • ${ambulance.model}`
              : "Loading details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm font-medium">
                Failed to load ambulance details. Please try again.
              </p>
            </div>
          </div>
        )}

        {ambulance && (
          <div className="space-y-4 py-2">
            {/* Basic Information */}
            <Section title="Basic Information">
              <Row label="Ambulance Number" value={ambulance.ambulanceNumber} />
              <Row
                label="Registration Number"
                value={
                  <code className="text-sm font-mono">
                    {ambulance.registrationNumber}
                  </code>
                }
              />
              <Row
                label="Vehicle Type"
                value={<AmbulanceTypeBadge type={ambulance.vehicleType} />}
              />
              <Row label="Model" value={ambulance.model} />
              <Row
                label="Capacity"
                value={`${ambulance.capacity} patient(s)`}
              />
              <Row
                label="Registration Expiry"
                value={fmt(ambulance.registrationExpiry)}
              />
            </Section>

            {/* Location Information */}
            <Section title="Current Location">
              {ambulance.currentLatitude && ambulance.currentLongitude ? (
                <>
                  <Row
                    label="Latitude"
                    value={
                      <code className="text-xs font-mono">
                        {ambulance.currentLatitude.toFixed(6)}
                      </code>
                    }
                  />
                  <Row
                    label="Longitude"
                    value={
                      <code className="text-xs font-mono">
                        {ambulance.currentLongitude.toFixed(6)}
                      </code>
                    }
                  />
                </>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location information not available</span>
                </div>
              )}
            </Section>

            {/* Driver Information */}
            <Section title="Assigned Driver">
              {ambulance.driver ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    {ambulance.driver.user.profileUrl ? (
                      <img
                        src={ambulance.driver.user.profileUrl}
                        alt={ambulance.driver.user.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-lg">
                        {ambulance.driver.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-base">
                        {ambulance.driver.user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ambulance.driver.user.email}
                      </p>
                    </div>
                  </div>
                  <Row
                    label="Contact Number"
                    value={ambulance.driver.contactNumber}
                  />
                  <Row label="Address" value={ambulance.driver.address} />
                  <Row
                    label="License Number"
                    value={
                      <code className="text-sm font-mono">
                        {ambulance.driver.licenseNumber}
                      </code>
                    }
                  />
                  <Row
                    label="License Expiry"
                    value={fmt(ambulance.driver.licenseExpiry)}
                  />
                  <Row
                    label="NID Number"
                    value={
                      <code className="text-sm font-mono">
                        {ambulance.driver.nidNumber}
                      </code>
                    }
                  />
                  <Row
                    label="Approval Status"
                    value={
                      <Badge
                        variant={
                          ambulance.driver.approvalStatus === "APPROVED"
                            ? "default"
                            : ambulance.driver.approvalStatus === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {ambulance.driver.approvalStatus}
                      </Badge>
                    }
                  />
                  <Row
                    label="Availability"
                    value={
                      ambulance.driver.isAvailable ? (
                        <Badge variant="default">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Not Available</Badge>
                      )
                    }
                  />

                  {/* Unassign Button */}
                  <div className="pt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={handleUnassignDriver}
                      disabled={isUnassigning}
                    >
                      {isUnassigning ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <UserMinus className="h-4 w-4 mr-2" />
                      )}
                      Unassign Driver
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>No driver assigned to this ambulance</span>
                  </div>

                  {/* Assign Driver Button/Form */}
                  {!showAssignForm ? (
                    <div className="pt-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowAssignForm(true)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign Driver
                      </Button>
                    </div>
                  ) : (
                    <Section title="Assign Driver">
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
                              All approved drivers are currently assigned
                            </p>
                          </div>
                        )}
                      </div>
                    </Section>
                  )}
                </>
              )}
            </Section>

            {/* Timeline */}
            <Section title="Timeline">
              <Row label="Created" value={fmtDateTime(ambulance.createdAt)} />
              <Row
                label="Last Updated"
                value={fmtDateTime(ambulance.updatedAt)}
              />
            </Section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
