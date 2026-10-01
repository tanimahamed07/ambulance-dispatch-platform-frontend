"use client";

import { format } from "date-fns";
import { useState } from "react";
import {
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Truck,
  Users,
  Clock,
  CreditCard,
  MapPinned,
  Shield,
  Loader2,
  AlertCircle,
  UserPlus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AmbulanceStatusBadge from "./ambulance-status-badge";
import AmbulanceTypeBadge from "./ambulance-type-badge";

import { useGetAmbulanceDetails } from "@/hooks/ambulance.hooks";
import {
  useAssignDriverWithAmbulance,
  useGetAllDrivers,
} from "@/hooks/driver.hooks";
import { toast } from "@/components/ui/toast";

interface AmbulanceDetailsModalProps {
  ambulanceId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AmbulanceDetailsModal({
  ambulanceId,
  isOpen,
  onOpenChange,
}: AmbulanceDetailsModalProps) {
  const [selectedDriverId, setSelectedDriverId] = useState("");

  const { data, isLoading, error } = useGetAmbulanceDetails(ambulanceId);
  const { mutate: assignDriver, isPending: assignDriverPending } =
    useAssignDriverWithAmbulance();

  const ambulance = data?.data;

  const { data: driversData, isLoading: driversLoading } = useGetAllDrivers({
    hasAmbulance: "false",
    approvalStatus: "APPROVED",
    isAvailable: "true",
    limit: 100,
  });

  const assignDriverMutation = useAssignDriverWithAmbulance(
    ambulanceId as sting,
  );

  const handleAssignDriver = () => {
    if (!selectedDriverId || !ambulanceId) return;

    assignDriver(
      { driverId: selectedDriverId },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Success",
            description: "Driver assigned successfully",
          });

          setSelectedDriverId("");
        },

        onError: (error: any) => {
          toast.add({
            type: "error",
            title: "Error",
            description: error?.message || "Failed to assign driver",
          });
        },
      },
    );
  };

  const availableDrivers = driversData?.data?.data || [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ambulance Details</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Ambulance Number
                  </p>
                  <p className="font-medium text-lg">
                    {ambulance.ambulanceNumber}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Registration Number
                  </p>
                  <p className="font-medium">{ambulance.registrationNumber}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vehicle Type</p>
                  <AmbulanceTypeBadge type={ambulance.vehicleType} />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <AmbulanceStatusBadge status={ambulance.status} />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Model
                  </p>
                  <p className="font-medium">{ambulance.model}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Capacity
                  </p>
                  <Badge variant="outline">
                    {ambulance.capacity} patient(s)
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Registration Expiry
                  </p>
                  <p className="font-medium">
                    {format(
                      new Date(ambulance.registrationExpiry),
                      "dd MMM yyyy",
                    )}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Created At
                  </p>
                  <p className="font-medium">
                    {format(
                      new Date(ambulance.createdAt),
                      "dd MMM yyyy, hh:mm a",
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Current Location
              </h3>

              {ambulance.currentLatitude && ambulance.currentLongitude ? (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Latitude</p>
                      <p className="font-mono font-medium">
                        {ambulance.currentLatitude.toFixed(6)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Longitude</p>
                      <p className="font-mono font-medium">
                        {ambulance.currentLongitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-muted/50 p-4 text-center text-sm text-muted-foreground">
                  Location information not available
                </div>
              )}
            </div>

            <Separator />

            {/* Driver Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Assigned Driver
              </h3>

              {ambulance.driver ? (
                <div className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Name
                        </p>
                        <p className="font-medium">
                          {ambulance.driver.user.name}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </p>
                        <p className="font-medium">
                          {ambulance.driver.user.email}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Contact Number
                        </p>
                        <p className="font-medium">
                          {ambulance.driver.contactNumber}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Approval Status
                        </p>

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
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPinned className="h-4 w-4" />
                          Address
                        </p>
                        <p className="font-medium">
                          {ambulance.driver.address}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          License Number
                        </p>
                        <p className="font-medium">
                          {ambulance.driver.licenseNumber}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          License Expiry
                        </p>
                        <p className="font-medium">
                          {format(
                            new Date(ambulance.driver.licenseExpiry),
                            "dd MMM yyyy",
                          )}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          NID Number
                        </p>
                        <p className="font-medium">
                          {ambulance.driver.nidNumber}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Availability
                        </p>

                        <Badge
                          variant={
                            ambulance.driver.isAvailable
                              ? "default"
                              : "secondary"
                          }
                        >
                          {ambulance.driver.isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center">
                    <User className="h-8 w-8 mx-auto text-muted-foreground mb-2" />

                    <p className="text-sm font-medium">No driver assigned</p>

                    <p className="text-xs text-muted-foreground mt-1">
                      Assign an available driver to this ambulance
                    </p>
                  </div>

                  {/* Driver Assignment */}
                  <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      <h4 className="font-semibold">Assign Driver</h4>
                    </div>

                    {driversLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : availableDrivers.length > 0 ? (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Select Available Driver
                          </label>

                          <Select
                            value={selectedDriverId}
                            onValueChange={setSelectedDriverId}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a driver" />
                            </SelectTrigger>

                            <SelectContent>
                              {availableDrivers.map((driver) => (
                                <SelectItem key={driver.id} value={driver.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {driver.user.name}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                      {driver.licenseNumber} •{" "}
                                      {driver.contactNumber}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          onClick={handleAssignDriver}
                          disabled={
                            !selectedDriverId || assignDriverMutation.isPending
                          }
                          className="w-full"
                        >
                          {assignDriverMutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Assigning...
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Assign Driver
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">
                          No available drivers found
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          All approved drivers are currently assigned
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
