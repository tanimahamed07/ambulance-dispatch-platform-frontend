"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { format } from "date-fns";
import { Loader2, ExternalLink, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type {
  DriverApprovalStatus,
  RejectionReason,
} from "@/types/driver.type";
import {
  useGetDriverDetails,
  useDriverApplicationStatusUpdate,
} from "@/hooks/driver.hooks";

interface DriverApplicationDetailsModalProps {
  driverId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const REJECTION_REASON_LABELS: Record<string, string> = {
  INVALID_LICENSE: "Invalid License",
  EXPIRED_LICENSE: "Expired License",
  FAILED_BACKGROUND_CHECK: "Failed Background Check",
  INCOMPLETE_DOCUMENTS: "Incomplete Documents",
  OTHER: "Other",
};

const REJECTION_REASONS: RejectionReason[] = [
  "INVALID_LICENSE",
  "EXPIRED_LICENSE",
  "FAILED_BACKGROUND_CHECK",
  "INCOMPLETE_DOCUMENTS",
  "OTHER",
];

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

const fmt = (date: string | null) =>
  date ? format(new Date(date), "dd MMM yyyy") : null;

const fmtDateTime = (date: string | null) =>
  date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : null;

export function DriverApplicationDetailsModal({
  driverId,
  isOpen,
  onOpenChange,
}: DriverApplicationDetailsModalProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState<RejectionReason | "">(
    "",
  );
  const [rejectionNote, setRejectionNote] = useState("");

  const { data, isLoading, isError, error } = useGetDriverDetails(
    driverId,
    isOpen,
  );

  const { mutate: updateStatus, isPending: isUpdating } =
    useDriverApplicationStatusUpdate();

  const driver = data?.data;

  const statusConfig = driver
    ? APPROVAL_STATUS_CONFIG[driver.approvalStatus]
    : null;

  const handleApprove = () => {
    if (!driver) return;

    updateStatus(
      {
        driverId: driver.id,
        approvalStatus: "APPROVED",
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  const handleReject = () => {
    if (!driver || !rejectionReason) return;

    updateStatus(
      {
        driverId: driver.id,
        approvalStatus: "REJECTED",
        rejectionReason: rejectionReason as RejectionReason,
        rejectionNote: rejectionNote || undefined,
      },
      {
        onSuccess: () => {
          setShowRejectForm(false);
          setRejectionReason("");
          setRejectionNote("");
          onOpenChange(false);
        },
      },
    );
  };

  const handleCancelReject = () => {
    setShowRejectForm(false);
    setRejectionReason("");
    setRejectionNote("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span>Driver Application Details</span>
            {statusConfig && (
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {driver
              ? `Application submitted on ${fmt(driver.createdAt)}`
              : "Loading details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <div className="py-6 space-y-3">
            <p className="text-center text-sm text-destructive">
              {(error as Error)?.message ||
                "Failed to load driver application details."}
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Note: Only pending applications can be viewed in detail at this
              time.
            </p>
          </div>
        )}

        {driver && (
          <div className="space-y-4 py-2">
            {/* Applicant Information */}
            <Section title="Applicant Information">
              <div className="flex items-center gap-3 mb-2">
                {driver.user.profileUrl ? (
                  <img
                    src={driver.user.profileUrl}
                    alt={driver.user.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-lg">
                    {driver.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-base">{driver.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {driver.user.email}
                  </p>
                </div>
              </div>
              <Row label="Contact Number" value={driver.contactNumber} />
              <Row label="Address" value={driver.address} />
            </Section>

            {/* License Information */}
            <Section title="License Information">
              <Row
                label="License Number"
                value={
                  <code className="text-sm font-mono">
                    {driver.licenseNumber}
                  </code>
                }
              />
              <Row label="License Expiry" value={fmt(driver.licenseExpiry)} />
              <Row
                label="NID Number"
                value={
                  <code className="text-sm font-mono">{driver.nidNumber}</code>
                }
              />
              {driver.licenseUrl && (
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(driver.licenseUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View License Document
                  </Button>
                </div>
              )}
            </Section>

            {/* Availability Status */}
            <Section title="Driver Status">
              <Row
                label="Availability"
                value={
                  driver.isAvailable ? (
                    <Badge variant="default">Available</Badge>
                  ) : (
                    <Badge variant="secondary">Not Available</Badge>
                  )
                }
              />
              {driver.ambulance && (
                <>
                  <Row
                    label="Assigned Ambulance"
                    value={driver.ambulance.ambulanceNumber}
                  />
                  <Row
                    label="Vehicle Type"
                    value={driver.ambulance.vehicleType}
                  />
                  <Row label="Model" value={driver.ambulance.model} />
                </>
              )}
            </Section>

            {/* Rejection Information (if rejected) */}
            {driver.approvalStatus === "REJECTED" && (
              <Section title="Rejection Details">
                <Row
                  label="Reason"
                  value={
                    driver.rejectionReason
                      ? REJECTION_REASON_LABELS[driver.rejectionReason]
                      : "Not specified"
                  }
                />
                {driver.rejectionNote && (
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">Note:</p>
                    <p className="font-medium">{driver.rejectionNote}</p>
                  </div>
                )}
                <Row
                  label="Rejected At"
                  value={fmtDateTime(driver.rejectedAt)}
                />
              </Section>
            )}

            {/* Application Timeline */}
            <Section title="Application Timeline">
              <Row label="Submitted" value={fmtDateTime(driver.createdAt)} />
              <Row label="Last Updated" value={fmtDateTime(driver.updatedAt)} />
            </Section>

            {/* Action Buttons (for pending applications) */}
            {driver.approvalStatus === "PENDING" && (
              <>
                {!showRejectForm ? (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowRejectForm(true)}
                      disabled={isUpdating}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="w-full"
                      onClick={handleApprove}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve
                    </Button>
                  </div>
                ) : (
                  <Section title="Rejection Form">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="rejectionReason">
                          Rejection Reason{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={rejectionReason}
                          onValueChange={(value) =>
                            setRejectionReason(value as RejectionReason)
                          }
                        >
                          <SelectTrigger id="rejectionReason">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {REJECTION_REASONS.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {REJECTION_REASON_LABELS[reason]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rejectionNote">
                          Additional Note (Optional)
                        </Label>
                        <Textarea
                          id="rejectionNote"
                          placeholder="Provide additional details about the rejection..."
                          value={rejectionNote}
                          onChange={(e) => setRejectionNote(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelReject}
                          disabled={isUpdating}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleReject}
                          disabled={!rejectionReason || isUpdating}
                        >
                          {isUpdating ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-2" />
                          )}
                          Confirm Reject
                        </Button>
                      </div>
                    </div>
                  </Section>
                )}
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
