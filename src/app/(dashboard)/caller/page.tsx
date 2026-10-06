"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Plus,
  List,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Car,
  DollarSign,
  Wallet,
  CreditCard,
} from "lucide-react";
import { getCallerDashboard } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function CallerPage() {
  const {
    data: analytics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["caller-dashboard"],
    queryFn: getCallerDashboard,
    staleTime: 0, // Data immediately becomes stale, forces refetch on mount
    refetchOnMount: "always", // Always refetch when component mounts
  });

  const stats = analytics?.data;

  // Safely merge stats with defaults
  const dashboardStats = {
    emergencies: {
      total: stats?.emergencies?.total ?? 0,
      pending: stats?.emergencies?.pending ?? 0,
      completed: stats?.emergencies?.completed ?? 0,
      cancelled: stats?.emergencies?.cancelled ?? 0,
    },
    trips: {
      total: stats?.trips?.total ?? 0,
      completed: stats?.trips?.completed ?? 0,
    },
    payments: {
      totalSpending: stats?.payments?.totalSpending ?? 0,
      completedPayments: stats?.payments?.completedPayments ?? 0,
      pendingPayments: stats?.payments?.pendingPayments ?? 0,
    },
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Caller Dashboard
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

      {/* Analytics Error State */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-12">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="text-sm text-muted-foreground">
            Failed to load dashboard analytics
          </p>
        </div>
      )}

      {/* Analytics Sections */}
      {!isError && (
        <>
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
                    Total Requests
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.emergencies.total}
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
                    {dashboardStats.emergencies.pending}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardStats.emergencies.completed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully resolved
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cancelled
                  </CardTitle>
                  <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {dashboardStats.emergencies.cancelled}
                  </div>
                  <p className="text-xs text-muted-foreground">Not completed</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trip Statistics */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Car className="h-5 w-5" />
              Trip History
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Trips
                  </CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.trips.total}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All ambulance trips
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Trips
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardStats.trips.completed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully finished
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Statistics */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Overview
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spending
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ৳{dashboardStats.payments.totalSpending.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All time spending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Payments
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardStats.payments.completedPayments}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successful transactions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Payments
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {dashboardStats.payments.pendingPayments}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting payment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

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
