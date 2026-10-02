"use client";

import { History } from "lucide-react";

export default function DriverHistoryPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Trip History
        </h1>
        <p className="text-sm text-muted-foreground">
          View all your completed and rejected emergency dispatch history.
        </p>
      </div>

      {/* Placeholder */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
        <div className="flex flex-col items-center gap-2 text-center">
          <History className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No Trip History</h3>
          <p className="text-sm text-muted-foreground">
            Your completed and rejected trip history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
