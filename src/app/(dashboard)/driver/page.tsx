"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  XCircle,
  Activity,
  Car,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  AlertCircle,
  ThumbsUp,
  Send,
  Ban,
} from "lucide-react";
import {
  useGetDriverProfile,
  useDriverStatusUpdate,
} from "@/hooks/driver.hooks";
import { getDriverDashboard } from "@/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

export default function DriverPage() {
  const { data: driverProfile, isLoading: profileLoading } =
    useGetDriverProfile();
  const statusUpdate = useDriverStatusUpdate();

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError,
  } = useQuery({
    queryKey: ["driver-dashboard"],
    queryFn: getDriverDashboard,
  });

  const driver = driverProfile?.data;
  const isAvailable = driver?.isAvailable ?? false;
  const stats = analytics?.data;

  // Default values if stats are not available
  const defaultStats = {
    trips: { total: 0, completed: 0, cancelled: 0, inProgress: 0 },
    dispatches: {
      total: 0,
      pending: 0,
      accepted: 0,
      completed: 0,
      rejected: 0,
    },
    earnings: { total: 0, thisMonth: 0, lastMonth: 0, pending: 0 },
    performance: {
      rating: 0,
      totalRatings: 0,
      acceptanceRate: 0,
      completionRate: 0,
    },
  };

  // Safely merge stats with defaults
  const dashboardStats = {
    trips: {
      total: stats?.trips?.total ?? 0,
      completed: stats?.trips?.completed ?? 0,
      cancelled: stats?.trips?.cancelled ?? 0,
      inProgress: stats?.trips?.inProgress ?? 0,
    },
    dispatches: {
      total: stats?.dispatches?.total ?? 0,
      pending: stats?.dispatches?.pending ?? 0,
      accepted: stats?.dispatches?.accepted ?? 0,
      completed: stats?.dispatches?.completed ?? 0,
      rejected: stats?.dispatches?.rejected ?? 0,
    },
    earnings: {
      total: stats?.earnings?.total ?? 0,
      thisMonth: stats?.earnings?.thisMonth ?? 0,
      lastMonth: stats?.earnings?.lastMonth ?? 0,
      pending: stats?.earnings?.pending ?? 0,
    },
    performance: {
      rating: stats?.performance?.rating ?? 0,
      totalRatings: stats?.performance?.totalRatings ?? 0,
      acceptanceRate: stats?.performance?.acceptanceRate ?? 0,
      completionRate: stats?.performance?.completionRate ?? 0,
    },
  };

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

  if (analyticsLoading || profileLoading) {
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
          Driver Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your duty status, track trips, and monitor your performance
        </p>
      </div>

      {/* Duty Status Card */}
      {!profileLoading && driver && (
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
          {/* Trip Statistics */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Car className="h-5 w-5" />
              Trip Statistics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Trips
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.trips.total}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All time trips
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
                    {dashboardStats.trips.completed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Progress
                  </CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {dashboardStats.trips.inProgress}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently active
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
                    {dashboardStats.trips.cancelled}
                  </div>
                  <p className="text-xs text-muted-foreground">Not completed</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Dispatch Statistics */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Send className="h-5 w-5" />
              Dispatch Statistics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Dispatches
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.dispatches.total}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All dispatches
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
                    {dashboardStats.dispatches.pending}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Accepted
                  </CardTitle>
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {dashboardStats.dispatches.accepted}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Confirmed trips
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
                    {dashboardStats.dispatches.completed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Finished trips
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Rejected
                  </CardTitle>
                  <Ban className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {dashboardStats.dispatches.rejected}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Declined trips
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Earnings */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Earnings Overview
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Earnings
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ৳{dashboardStats.earnings.total.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All time earnings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    This Month
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ৳{dashboardStats.earnings.thisMonth.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Last Month
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ৳{dashboardStats.earnings.lastMonth.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Previous month
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
                    ৳{dashboardStats.earnings.pending.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting payment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Performance Metrics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Rating
                  </CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.performance.rating.toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardStats.performance.totalRatings} ratings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Acceptance Rate
                  </CardTitle>
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {dashboardStats.performance.acceptanceRate.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dispatch acceptance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completion Rate
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardStats.performance.completionRate.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trip completion
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Ratings
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.performance.totalRatings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reviews received
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Alert */}
          {(dashboardStats.performance.acceptanceRate < 50 ||
            dashboardStats.performance.completionRate < 70) &&
            dashboardStats.performance.totalRatings > 0 && (
              <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-orange-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                      Performance Alert
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {dashboardStats.performance.acceptanceRate < 50 &&
                        "Your acceptance rate is below 50%. Consider accepting more dispatch requests to improve your standing."}
                      {dashboardStats.performance.completionRate < 70 &&
                        dashboardStats.performance.acceptanceRate >= 50 &&
                        "Your completion rate is below 70%. Focus on completing accepted trips to maintain good standing."}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}
