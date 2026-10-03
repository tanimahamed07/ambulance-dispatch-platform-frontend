"use client";

import { useState, type ComponentType } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Ban,
  CheckCheck,
  Clock,
  Eye,
  Navigation,
  Package,
  MapPin,
} from "lucide-react";

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
import type { MyTrip } from "@/types/trip.type";
import type {
  EmergencyType,
  Priority,
  TripStatus,
} from "@/types/emergency.type";
import { TripDetailsModal } from "./trip-details-modal";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const TRIP_STATUS_CONFIG: Record<
  TripStatus,
  {
    label: string;
    variant: BadgeVariant;
    icon: ComponentType<{ className?: string }>;
  }
> = {
  DISPATCHED: { label: "Dispatched", variant: "secondary", icon: Clock },
  EN_ROUTE: { label: "En Route", variant: "default", icon: Navigation },
  PICKED_UP: { label: "Picked Up", variant: "default", icon: Package },
  AT_HOSPITAL: { label: "At Hospital", variant: "secondary", icon: MapPin },
  COMPLETED: { label: "Completed", variant: "default", icon: CheckCheck },
  CANCELLED: { label: "Cancelled", variant: "destructive", icon: Ban },
};

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; variant: BadgeVariant }
> = {
  LOW: { label: "Low", variant: "secondary" },
  MEDIUM: { label: "Medium", variant: "outline" },
  HIGH: { label: "High", variant: "default" },
  CRITICAL: { label: "Critical", variant: "destructive" },
};

const EMERGENCY_TYPE_LABEL: Record<EmergencyType, string> = {
  ACCIDENT: "Accident",
  CARDIAC: "Cardiac",
  STROKE: "Stroke",
  PREGNANCY: "Pregnancy",
  TRAUMA: "Trauma",
  BREATHING_PROBLEM: "Breathing Problem",
  OTHER: "Other",
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <AlertCircle className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No trips found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        You don&apos;t have any trips at the moment.
      </p>
    </div>
  );
}

export default function MyTripsTable({ trips }: { trips: MyTrip[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (trips.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Emergency Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Started</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {trips.map((trip) => {
              const emergency = trip.emergency;
              const statusConfig = trip.status
                ? TRIP_STATUS_CONFIG[trip.status]
                : null;
              const priorityConfig = emergency?.priority
                ? PRIORITY_CONFIG[emergency.priority]
                : null;
              const StatusIcon = statusConfig?.icon;

              return (
                <TableRow key={trip.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                        {emergency?.patientName?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium">
                          {emergency?.patientName || "N/A"}
                        </p>
                        <p className="max-w-50 truncate text-xs text-muted-foreground">
                          {emergency?.pickupAddress || "N/A"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <code className="font-mono text-sm">
                      {emergency?.patientPhone || "N/A"}
                    </code>
                  </TableCell>

                  <TableCell className="text-sm">
                    {emergency?.emergencyType
                      ? EMERGENCY_TYPE_LABEL[emergency.emergencyType]
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    {priorityConfig ? (
                      <Badge variant={priorityConfig.variant}>
                        {priorityConfig.label}
                      </Badge>
                    ) : (
                      <Badge variant="outline">N/A</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    {statusConfig && StatusIcon ? (
                      <Badge variant={statusConfig.variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="capitalize">
                        {trip.status?.replace(/_/g, " ").toLowerCase() ||
                          "Unknown"}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {trip.createdAt
                      ? formatDistanceToNow(new Date(trip.createdAt), {
                          addSuffix: true,
                        })
                      : "N/A"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedId(trip.id)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <TripDetailsModal
        tripId={selectedId}
        isOpen={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </>
  );
}
