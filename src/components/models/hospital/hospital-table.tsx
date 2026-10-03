"use client";

import { useState } from "react";
import { AlertCircle, Eye, MapPin, Phone, Activity } from "lucide-react";

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
import type { Hospital } from "@/types/hospital.type";
import { HospitalDetailsModal } from "./hospital-details-modal";

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <AlertCircle className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No hospitals found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try changing the filters or add a new hospital.
      </p>
    </div>
  );
}

export default function HospitalTable({
  hospitals,
}: {
  hospitals: Hospital[];
}) {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    setIsDetailsModalOpen(true);
  };

  if (hospitals.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hospital Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Emergency Service</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                      {hospital.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{hospital.name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-start gap-1.5 max-w-50">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="text-sm truncate">{hospital.address}</span>
                  </div>
                </TableCell>

                <TableCell>
                  {hospital.emergencyAvailable ? (
                    <Badge variant="default" className="gap-1">
                      <Activity className="h-3 w-3" />
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Not Available</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm">{hospital.phone}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      hospital.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {hospital.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(hospital.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Hospital Details Modal */}
      <HospitalDetailsModal
        hospitalId={selectedHospitalId}
        isOpen={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />
    </>
  );
}
