"use client";

import { Navigation, MapPin } from "lucide-react";

export default function DriverActiveTripPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Active Trip
        </h1>
        <p className="text-sm text-muted-foreground">
          View and update the status of your current active trip.
        </p>
      </div>

      {/* Placeholder */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <Navigation className="h-12 w-12 text-muted-foreground" />
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No Active Trip</h3>
          <p className="text-sm text-muted-foreground">
            You don't have any active emergency trip at the moment.
          </p>
        </div>
      </div>
    </div>
  );
}
