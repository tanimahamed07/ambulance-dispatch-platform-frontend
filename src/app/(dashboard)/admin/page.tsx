"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Users,
  AlertCircle,
  Ambulance,
  UserCheck,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Phone,
  Car,
  UserCog,
  FileCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { getAdminDashboard } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function AdminPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
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
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of platform analytics and system statistics
        </p>
      </div>

      {/* Users Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.users.total}</div>
              <p className="text-xs text-muted-foreground">
                All registered users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.users.admins}</div>
              <p className="text-xs text-muted-foreground">
                System administrators
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dispatchers</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.users.dispatchers}
              </div>
              <p className="text-xs text-muted-foreground">
                Emergency dispatchers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drivers</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.users.drivers}
              </div>
              <p className="text-xs text-muted-foreground">Ambulance drivers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Callers</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.users.callers}
              </div>
              <p className="text-xs text-muted-foreground">Emergency callers</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Emergency Statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <CardTitle className="text-sm font-medium">
                Pending Emergencies
              </CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.emergencies.pending}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Emergencies
              </CardTitle>
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

      {/* Ambulance Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Ambulance className="h-5 w-5" />
          Ambulance Fleet
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Ambulances
              </CardTitle>
              <Ambulance className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.ambulances.total}
              </div>
              <p className="text-xs text-muted-foreground">Total fleet size</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Ambulances
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.ambulances.available}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready for dispatch
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Trip</CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.ambulances.onTrip}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Driver Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Driver Management
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Drivers
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analytics.drivers.approved}
              </div>
              <p className="text-xs text-muted-foreground">
                Active certified drivers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Applications
              </CardTitle>
              <FileCheck className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {analytics.drivers.pendingApplications}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Revenue Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{analytics.revenue.total.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total collected revenue
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
              <div className="text-2xl font-bold">
                {analytics.revenue.completedPayments}
              </div>
              <p className="text-xs text-muted-foreground">
                Successful transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
