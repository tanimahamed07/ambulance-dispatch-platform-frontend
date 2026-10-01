"use client";

import { format } from "date-fns";
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
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Ambulance } from "@/types/ambulence.type";
import AmbulanceStatusBadge from "./ambulance-status-badge";
import AmbulanceTypeBadge from "./ambulance-type-badge";

interface AmbulanceDetailsModalProps {
  ambulance: Ambulance;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AmbulanceDetailsModal({
  ambulance,
  isOpen,
  onOpenChange,
}: AmbulanceDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ambulance Details</DialogTitle>
        </DialogHeader>

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
                <div>
                  <AmbulanceTypeBadge type={ambulance.vehicleType} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <div>
                  <AmbulanceStatusBadge status={ambulance.status} />
                </div>
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
                    "dd MMM yyyy"
                  )}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Created At
                </p>
                <p className="font-medium">
                  {format(new Date(ambulance.createdAt), "dd MMM yyyy, hh:mm a")}
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
              <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </p>
                    <p className="font-medium">{ambulance.driver.user.name}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </p>
                    <p className="font-medium">{ambulance.driver.user.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </p>
                    <p className="font-medium">{ambulance.driver.user.email}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      License Number
                    </p>
                    <p className="font-medium">
                      {ambulance.driver.licenseNumber}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center">
                <User className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">No driver assigned</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This ambulance is currently without a driver
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
