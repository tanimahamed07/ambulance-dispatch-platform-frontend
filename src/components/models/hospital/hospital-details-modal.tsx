"use client";

import type { ReactNode } from "react";
import {
  Loader2,
  Hospital as HospitalIcon,
  MapPin,
  Phone,
  Mail,
  Activity,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import {
  useGetHospitalById,
  useUpdateHospitalStatus,
} from "@/hooks/hospital.hooks";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/get-error-message";

interface HospitalDetailsModalProps {
  hospitalId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function HospitalDetailsModal({
  hospitalId,
  isOpen,
  onOpenChange,
}: HospitalDetailsModalProps) {
  const { data: response, isLoading, error } = useGetHospitalById(hospitalId);
  const updateStatusMutation = useUpdateHospitalStatus();

  const hospital = response?.data;

  const handleStatusChange = (newStatus: "ACTIVE" | "INACTIVE" | null) => {
    if (!hospital || !hospitalId || !newStatus) return;

    updateStatusMutation.mutate(
      {
        id: hospitalId,
        status: newStatus,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Request Submitted",
            description: "Hospital status updated successfully!",
            type: "success",
          });
          onOpenChange(false);
        },
        onError: (error) => {
          getErrorMessage(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span className="flex items-center gap-2">
              <HospitalIcon className="h-5 w-5" />
              Hospital Details
            </span>
            {hospital && (
              <Badge
                variant={hospital.status === "ACTIVE" ? "default" : "secondary"}
              >
                {hospital.status}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {hospital ? hospital.name : "Loading hospital details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="py-6 space-y-3">
            <p className="text-center text-sm text-destructive">
              Failed to load hospital details. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !error && hospital && (
          <div className="space-y-4 py-2">
            {/* Status Change Section */}
            <Section title="Update Status">
              <div className="flex items-center gap-3">
                <Select
                  value={hospital.status}
                  onValueChange={handleStatusChange}
                  disabled={updateStatusMutation.isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {updateStatusMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </Section>

            {/* Basic Information */}
            <Section title="Basic Information">
              <Row label="Hospital Name" value={hospital.name} />
              <Row
                label="Phone"
                value={
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <code className="font-mono text-sm">{hospital.phone}</code>
                  </span>
                }
              />
              {hospital.email && (
                <Row
                  label="Email"
                  value={
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {hospital.email}
                    </span>
                  }
                />
              )}
              <Row
                label="Emergency Service"
                value={
                  hospital.emergencyAvailable ? (
                    <Badge variant="default" className="gap-1">
                      <Activity className="h-3 w-3" />
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Not Available</Badge>
                  )
                }
              />
            </Section>

            {/* Location Information */}
            <Section title="Location Details">
              <Row
                label="Address"
                value={
                  <span className="flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span className="text-right">{hospital.address}</span>
                  </span>
                }
              />
              <Row
                label="Coordinates"
                value={`${hospital.latitude.toFixed(6)}, ${hospital.longitude.toFixed(6)}`}
              />
            </Section>

            {/* Specialties */}
            {hospital.specialties.length > 0 && (
              <Section title="Specialties">
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Section>
            )}

            {/* Timestamps */}
            <Section title="Record Information">
              <Row
                label="Created At"
                value={new Date(hospital.createdAt).toLocaleString()}
              />
              <Row
                label="Updated At"
                value={new Date(hospital.updatedAt).toLocaleString()}
              />
            </Section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
