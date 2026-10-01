"use client";

import { formatDistanceToNow } from "date-fns";
import { AlertCircle, MapPin, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Ambulance } from "@/types/ambulence.type";
import AmbulanceStatusBadge from "./ambulance-status-badge";
import AmbulanceTypeBadge from "./ambulance-type-badge";

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <AlertCircle className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No ambulances found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try changing the filters or add a new ambulance.
      </p>
    </div>
  );
}

export default function AmbulanceTable({
  ambulances,
}: {
  ambulances: Ambulance[];
}) {
  if (ambulances.length === 0) return <EmptyState />;

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ambulance Number</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ambulances.map((ambulance) => (
            <TableRow key={ambulance.id}>
              <TableCell>
                <p className="font-medium">{ambulance.ambulanceNumber}</p>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {ambulance.registrationNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Exp:{" "}
                    {new Date(ambulance.registrationExpiry).toLocaleDateString()}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <AmbulanceTypeBadge type={ambulance.vehicleType} />
              </TableCell>

              <TableCell>
                <p className="text-sm">{ambulance.model}</p>
              </TableCell>

              <TableCell>
                <Badge variant="outline">{ambulance.capacity} patient(s)</Badge>
              </TableCell>

              <TableCell>
                <AmbulanceStatusBadge status={ambulance.status} />
              </TableCell>

              <TableCell>
                {ambulance.driver ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        {ambulance.driver.user.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {ambulance.driver.user.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      License: {ambulance.driver.licenseNumber}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No driver assigned
                  </span>
                )}
              </TableCell>

              <TableCell>
                {ambulance.currentLatitude && ambulance.currentLongitude ? (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {ambulance.currentLatitude.toFixed(4)},{" "}
                      {ambulance.currentLongitude.toFixed(4)}
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Location unavailable
                  </span>
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(ambulance.createdAt), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
