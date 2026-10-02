"use client";

import Link from "next/link";
import { Activity, Plus, List, CheckCircle2, XCircle } from "lucide-react";
import {
  useGetDriverProfile,
  useDriverStatusUpdate,
} from "@/hooks/driver.hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";

export default function DriverPage() {
  const { data: driverProfile, isLoading } = useGetDriverProfile();
  const statusUpdate = useDriverStatusUpdate();

  const driver = driverProfile?.data;
  const isAvailable = driver?.isAvailable ?? false;

  const handleStatusToggle = async () => {
    try {
      await statusUpdate.mutateAsync(!isAvailable);
      toast.add({
        type: "success",
        title: "Status Updated",
        description: `You are now ${!isAvailable ? "available" : "unavailable"} for duty`,
      });
    } catch (error: any) {
      toast.add({
        type: "error",
        title: "Update Failed",
        description: error?.message || "Failed to update duty status",
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Driver Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your duty status and ambulance assignments.
        </p>
      </div>

      {/* Duty Status Card */}
      {!isLoading && driver && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                  isAvailable
                    ? "bg-green-500/10 text-green-600"
                    : "bg-gray-500/10 text-gray-600"
                }`}
              >
                {isAvailable ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Duty Status</h3>
                  <Badge variant={isAvailable ? "success" : "secondary"}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isAvailable
                    ? "You are currently available for emergency assignments"
                    : "You are currently unavailable for emergency assignments"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleStatusToggle}
              disabled={statusUpdate.isPending}
              variant={isAvailable ? "outline" : "default"}
              className="sm:shrink-0"
            >
              {statusUpdate.isPending
                ? "Updating..."
                : isAvailable
                  ? "Go Off Duty"
                  : "Go On Duty"}
            </Button>
          </div>
        </div>
      )}

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
