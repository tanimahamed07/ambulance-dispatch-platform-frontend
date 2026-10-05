"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Ambulance,
  UserCheck,
  Activity,
  Clock,
  CheckCircle2,
  Send,
  Users,
  ShieldCheck,
} from "lucide-react";
import { getDispatcherDashboard } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function DispatcherPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dispatcher-dashboard"],
    queryFn: getDispatcherDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-sm text-muted-foreground">
          Failed to load dashboard data
        </p>
      </div>
    );
  }

  const analytics = data.data;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Dispatcher Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor emergencies, manage dispatches, and coordinate resources
        </p>
      </div>

      {/* Emergency Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Emergency Requests
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Emergencies
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.emergencies.total}
              </div>
              <p className="text-xs text-muted-foreground">
                All emergency requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.emergencies.pending}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting dispatch</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <Send className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {analytics.emergencies.assigned}
              </div>
              <p className="text-xs text-muted-foreground">
                Dispatched ambulances
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.emergencies.completed}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully resolved
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dispatch Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Send className="h-5 w-5" />
          Dispatch Operations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Dispatches
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.dispatches.total}
              </div>
              <p className="text-xs text-muted-foreground">
                All dispatch operations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.dispatches.pending}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting driver acceptance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <ShieldCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {analytics.dispatches.accepted}
              </div>
              <p className="text-xs text-muted-foreground">
                En route to emergency
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.dispatches.completed}
              </div>
              <p className="text-xs text-muted-foreground">
                Finished dispatches
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Available Resources */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Available Resources
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Ambulances
              </CardTitle>
              <Ambulance className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.resources.availableAmbulances}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready for dispatch
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Drivers
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.resources.availableDrivers}
              </div>
              <p className="text-xs text-muted-foreground">
                Active drivers online
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dispatchable Units
              </CardTitle>
              <ShieldCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.resources.dispatchableDrivers}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready driver + ambulance pairs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alert Banner if low resources */}
      {(analytics.resources.dispatchableDrivers === 0 ||
        analytics.emergencies.pending >
          analytics.resources.dispatchableDrivers) && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-destructive">
                Resource Alert
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {analytics.resources.dispatchableDrivers === 0
                  ? "No dispatchable units currently available. Check driver and ambulance availability."
                  : "Pending emergencies exceed available dispatchable units. Consider allocating more resources."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
