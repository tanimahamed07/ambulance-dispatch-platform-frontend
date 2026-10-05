"use client";

import type { ReactNode } from "react";
import { format } from "date-fns";
import { Loader2, Mail, Phone, MapPin, IdCard, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useGetDriverDetails } from "@/hooks/driver.hooks";
import type { Driver } from "@/types/driver.type";

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

const fmt = (date: string | Date | null) =>
  date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : null;

interface DriverDetailsModalProps {
  driverId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DriverDetailsModal({
  driverId,
  isOpen,
  onOpenChange,
}: DriverDetailsModalProps) {
  const { data: response, isLoading, error } = useGetDriverDetails(driverId);

  const driver = response?.data;

  const getApprovalStatusBadge = (status: Driver["approvalStatus"]) => {
    const config = {
      PENDING: { label: "Pending", variant: "secondary" as const },
      APPROVED: { label: "Approved", variant: "default" as const },
      REJECTED: { label: "Rejected", variant: "destructive" as const },
    };

    const { label, variant } = config[status] || config.PENDING;
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getAvailabilityBadge = (isAvailable: boolean) => {
    return (
      <Badge variant={isAvailable ? "default" : "secondary"}>
        {isAvailable ? "Available" : "Not Available"}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span>Driver Details</span>
            {driver && getApprovalStatusBadge(driver.approvalStatus)}
          </DialogTitle>
          <DialogDescription>
            {driver
              ? `Registered on ${fmt(driver.createdAt)}`
              : "Loading driver details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <p className="py-6 text-center text-sm text-destructive">
            {(error as Error)?.message || "Failed to load driver details."}
          </p>
        )}

        {driver && (
          <div className="space-y-4 py-2">
            {/* Personal Information */}
            <Section title="Personal Information">
              <Row label="Full Name" value={driver.user.name} />
              <Row
                label="Email"
                value={
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {driver.user.email}
                  </span>
                }
              />
              <Row
                label="Contact Number"
                value={
                  driver.contactNumber && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {driver.contactNumber}
                    </span>
                  )
                }
              />
              <Row
                label="Address"
                value={
                  driver.address && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {driver.address}
                    </span>
                  )
                }
              />
            </Section>

            {/* Driver Documents */}
            <Section title="Driver Documents">
              <Row
                label="License Number"
                value={
                  <span className="flex items-center gap-1 font-mono">
                    <IdCard className="h-3 w-3" />
                    {driver.licenseNumber}
                  </span>
                }
              />
              <Row
                label="NID Number"
                value={
                  <span className="flex items-center gap-1 font-mono">
                    <FileText className="h-3 w-3" />
                    {driver.nidNumber}
                  </span>
                }
              />
              {driver.licenseUrl && (
                <Row
                  label="License Document"
                  value={
                    <a
                      href={driver.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      View Document
                    </a>
                  }
                />
              )}
              {driver.nidUrl && (
                <Row
                  label="NID Document"
                  value={
                    <a
                      href={driver.nidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      View Document
                    </a>
                  }
                />
              )}
            </Section>

            {/* Driver Status */}
            <Section title="Driver Status">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Availability
                </span>
                {getAvailabilityBadge(driver.isAvailable)}
              </div>
              <Row
                label="Ambulance Assigned"
                value={driver.ambulanceId ? "Yes" : "No"}
              />
              {driver.ambulance && (
                <Row
                  label="Ambulance Number"
                  value={driver.ambulance.ambulanceNumber}
                />
              )}
            </Section>

            {/* Timestamps */}
            <Section title="Record Information">
              <Row label="Created At" value={fmt(driver.createdAt)} />
              <Row label="Updated At" value={fmt(driver.updatedAt)} />
              {driver.approvedAt && (
                <Row label="Approved At" value={fmt(driver.approvedAt)} />
              )}
            </Section>

            {/* Rejection Info (if applicable) */}
            {driver.approvalStatus === "REJECTED" &&
              driver.rejectionReason && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm font-medium text-red-900">
                    Rejection Reason
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {driver.rejectionReason}
                  </p>
                  {driver.rejectionNote && (
                    <p className="text-xs text-red-600 mt-1">
                      Note: {driver.rejectionNote}
                    </p>
                  )}
                </div>
              )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
