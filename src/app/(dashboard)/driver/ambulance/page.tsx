"use client";

import { Ambulance, Phone, MapPin } from "lucide-react";
import { useGetDriverProfile } from "@/hooks/driver.hooks";
import { Badge } from "@/components/ui/badge";

export default function DriverAmbulancePage() {
  const { data: driverProfile, isLoading } = useGetDriverProfile();

  const driver = driverProfile?.data;
  const hasAmbulance = driver?.ambulanceId;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            My Ambulance
          </h1>
          <p className="text-sm text-muted-foreground">
            View information about your assigned ambulance.
          </p>
        </div>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          My Ambulance
        </h1>
        <p className="text-sm text-muted-foreground">
          View information about your assigned ambulance.
        </p>
      </div>

      {!hasAmbulance ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
          <div className="flex flex-col items-center gap-2 text-center">
            <Ambulance className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No Ambulance Assigned</h3>
            <p className="text-sm text-muted-foreground">
              You don't have an ambulance assigned to you yet. Please contact admin.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Ambulance className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Ambulance Information</h3>
                  <Badge variant="default">Assigned</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your assigned ambulance details and information
                </p>
              </div>
            </div>

            {/* Placeholder for ambulance details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Vehicle Number
                </p>
                <p className="text-sm">Loading...</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Vehicle Type
                </p>
                <p className="text-sm">Loading...</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <p className="text-sm">Loading...</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Base Location
                </p>
                <p className="text-sm">Loading...</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Emergency Contact</p>
                  <p className="text-xs text-muted-foreground">
                    For any ambulance-related issues, contact your supervisor or admin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
