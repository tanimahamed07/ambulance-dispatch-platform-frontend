import Link from "next/link";
import { Activity, Plus, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DispatcherPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Dispatcher Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Request emergency ambulance services and track your requests.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/caller/request"
          className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-destructive/50 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
              <Plus className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">Request Ambulance</h3>
              <p className="text-sm text-muted-foreground">
                Submit a new emergency ambulance request
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/caller/my-emergencies"
          className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <List className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">My Emergency Requests</h3>
              <p className="text-sm text-muted-foreground">
                View and track all your emergency requests
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Info Section */}
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="flex items-start gap-3">
          <Activity className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-destructive">
              Emergency Hotline: 999
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              In case of life-threatening emergency, call 999 immediately while
              submitting an ambulance request through this platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
