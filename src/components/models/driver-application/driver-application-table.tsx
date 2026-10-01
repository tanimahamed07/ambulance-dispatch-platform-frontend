"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, Eye } from "lucide-react";

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
import type { Driver, DriverApprovalStatus } from "@/types/driver.type";
import { DriverApplicationDetailsModal } from "./driver-application-details-modal";

const APPROVAL_STATUS_CONFIG: Record<
  DriverApprovalStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  PENDING: { label: "Pending", variant: "secondary" },
  APPROVED: { label: "Approved", variant: "default" },
  REJECTED: { label: "Rejected", variant: "destructive" },
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <AlertCircle className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No applications found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try changing the filters or wait for new driver applications.
      </p>
    </div>
  );
}

export default function DriverApplicationTable({
  applications,
}: {
  applications: Driver[];
}) {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = (driverId: string) => {
    setSelectedDriverId(driverId);
    setIsModalOpen(true);
  };

  if (applications.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>NID Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((application) => {
              const statusConfig =
                APPROVAL_STATUS_CONFIG[application.approvalStatus];

              return (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {application.user.profileUrl ? (
                        <img
                          src={application.user.profileUrl}
                          alt={application.user.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          {application.user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{application.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-sm">{application.contactNumber}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {application.address}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <code className="text-sm font-mono">
                      {application.licenseNumber}
                    </code>
                  </TableCell>

                  <TableCell>
                    <code className="text-sm font-mono">
                      {application.nidNumber}
                    </code>
                  </TableCell>

                  <TableCell>
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(application.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDetailsClick(application.id)}
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

      {/* Driver Application Detail Modal */}
      <DriverApplicationDetailsModal
        driverId={selectedDriverId}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
