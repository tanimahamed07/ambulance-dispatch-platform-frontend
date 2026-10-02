"use client";

import { ClipboardList } from "lucide-react";

export default function DriverDispatchesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Assigned Requests
        </h1>
        <p className="text-sm text-muted-foreground">
          Emergency requests assigned to you by admin/dispatcher. Accept or reject assignments.
        </p>
      </div>

      {/* Placeholder */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
        <div className="flex flex-col items-center gap-2 text-center">
          <ClipboardList className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No Assigned Requests</h3>
          <p className="text-sm text-muted-foreground">
            You don't have any assigned emergency requests at the moment.
          </p>
        </div>
      </div>
    </div>
  );
}
