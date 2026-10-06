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
import type {
  Emergency,
  EmergencyType,
  Priority,
  EmergencyStatus,
} from "@/types/emergency.type";
import { DispatcherEmergencyModal } from "./dispatcher-emergency-modal";

const PRIORITY_CONFIG: Record<
  Priority,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  LOW: { label: "Low", variant: "secondary" },
  MEDIUM: { label: "Medium", variant: "outline" },
  HIGH: { label: "High", variant: "default" },
  CRITICAL: { label: "Critical", variant: "destructive" },
};

const STATUS_CONFIG: Record<
  EmergencyStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  PENDING: { label: "Pending", variant: "secondary" },
  ASSIGNED: { label: "Assigned", variant: "outline" },
  DISPATCHED: { label: "Dispatched", variant: "default" },
  EN_ROUTE: { label: "En Route", variant: "default" },
  PICKED_UP: { label: "Picked Up", variant: "default" },
  IN_PROGRESS: { label: "In Progress", variant: "default" },
  COMPLETED: { label: "Completed", variant: "default" },
  CANCELLED: { label: "Cancelled", variant: "destructive" },
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
      <h3 className="mt-3 text-lg font-semibold">No emergencies found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        There are no emergency requests at the moment.
      </p>
    </div>
  );
}

export default function DispatcherEmergenciesTable({
  emergencies,
}: {
  emergencies: Emergency[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!emergencies || emergencies.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-70">Patient</TableHead>
                <TableHead className="w-32.5">Contact</TableHead>
                <TableHead className="w-35">Emergency Type</TableHead>
                <TableHead className="w-25">Priority</TableHead>
                <TableHead className="w-30">Status</TableHead>
                <TableHead className="w-30">Requested</TableHead>
                <TableHead className="text-right w-25">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {emergencies.map((emergency) => {
                const statusConfig = STATUS_CONFIG[emergency.status] || {
                  label: emergency.status || "Unknown",
                  variant: "secondary" as const,
                };
                const priorityConfig = PRIORITY_CONFIG[emergency.priority] || {
                  label: emergency.priority || "Unknown",
                  variant: "secondary" as const,
                };

                return (
                  <TableRow key={emergency.id}>
                    <TableCell className="max-w-70">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                          {emergency.patientName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">
                            {emergency.patientName}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {emergency.pickupAddress}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <code className="font-mono text-sm">
                        {emergency.patientPhone}
                      </code>
                    </TableCell>

                    <TableCell className="text-sm">
                      {EMERGENCY_TYPE_LABEL[emergency.emergencyType]}
                    </TableCell>

                    <TableCell>
                      <Badge variant={priorityConfig.variant}>
                        {priorityConfig.label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(emergency.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedId(emergency.id)}
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
      </div>

      <DispatcherEmergencyModal
        emergencyId={selectedId}
        isOpen={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </>
  );
}
