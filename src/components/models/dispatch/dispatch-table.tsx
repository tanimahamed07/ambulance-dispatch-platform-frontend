"use client";

import { useState, type ComponentType } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  Ban,
  CheckCheck,
  CheckCircle,
  Clock,
  Eye,
  XCircle,
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
import type { MyDispatch } from "@/types/dispatch.type";
import type {
  DispatchStatus,
  EmergencyType,
  Priority,
} from "@/types/emergency.type";
import { DispatchDetailsModal } from "./dispatch-details-modal";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const STATUS_CONFIG: Record<
  DispatchStatus,
  {
    label: string;
    variant: BadgeVariant;
    icon: ComponentType<{ className?: string }>;
  }
> = {
  PENDING: { label: "Pending", variant: "secondary", icon: Clock },
  ACCEPTED: { label: "Accepted", variant: "default", icon: CheckCircle },
  REJECTED: { label: "Rejected", variant: "destructive", icon: XCircle },
  CANCELLED: { label: "Cancelled", variant: "outline", icon: Ban },
  COMPLETED: { label: "Completed", variant: "default", icon: CheckCheck },
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
      <h3 className="mt-3 text-lg font-semibold">No dispatch requests found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        You don&apos;t have any assigned dispatch requests at the moment.
      </p>
    </div>
  );
}

export default function DispatchTable({
  dispatches,
}: {
  dispatches: MyDispatch[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (dispatches.length === 0) return <EmptyState />;

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
              <TableHead>Dispatched</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dispatches.map(({ id, status, dispatchedAt, emergency }) => {
              const statusConfig = STATUS_CONFIG[status];
              const priorityConfig = PRIORITY_CONFIG[emergency.priority];
              const StatusIcon = statusConfig.icon;

              return (
                <TableRow key={id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                        {emergency.patientName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium">{emergency.patientName}</p>
                        <p className="max-w-50 truncate text-xs text-muted-foreground">
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
                    <Badge variant={statusConfig.variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {dispatchedAt
                      ? formatDistanceToNow(new Date(dispatchedAt), {
                          addSuffix: true,
                        })
                      : "N/A"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedId(id)}
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

      <DispatchDetailsModal
        dispatchId={selectedId}
        isOpen={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </>
  );
}
