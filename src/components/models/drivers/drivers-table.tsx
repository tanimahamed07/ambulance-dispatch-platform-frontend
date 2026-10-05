"use client";

import { useState } from "react";
import { Eye, User2 } from "lucide-react";

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
import type { Driver } from "@/types/driver.type";
import DriverDetailsModal from "./driver-details-modal";

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <User2 className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No drivers found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        No approved drivers available at the moment.
      </p>
    </div>
  );
}

export default function DriversTable({ drivers }: { drivers: Driver[] }) {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDetails = (driver: Driver) => {
    setSelectedDriverId(driver.id);
    setIsOpen(true);
  };

  const getAvailabilityBadge = (isAvailable: boolean) => {
    return (
      <Badge
        variant={isAvailable ? "default" : "secondary"}
        className={
          isAvailable
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-gray-100 text-gray-800 border-gray-200"
        }
      >
        {isAvailable ? "Available" : "Not Available"}
      </Badge>
    );
  };

  if (drivers.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Ambulance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {drivers.map((driver) => {
              return (
                <TableRow key={driver.id}>
                  <TableCell>
                    <p className="font-medium">{driver.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {driver.id.slice(0, 8)}...
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">{driver.user.email}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">{driver.contactNumber || "N/A"}</p>
                  </TableCell>

                  <TableCell>
                    <p className="font-mono text-sm">{driver.licenseNumber}</p>
                  </TableCell>

                  <TableCell>
                    {driver.ambulance ? (
                      <div>
                        <p className="font-medium text-sm">
                          {driver.ambulance.ambulanceNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {driver.ambulance.vehicleType}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not Assigned
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    {getAvailabilityBadge(driver.isAvailable)}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDetails(driver)}
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

      {/* Driver Details Modal */}
      <DriverDetailsModal
        driverId={selectedDriverId}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
