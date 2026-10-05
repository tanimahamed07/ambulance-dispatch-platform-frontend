"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useGetUserProfile } from "@/hooks";
import type { UserProfile } from "@/types";
import {
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  User,
  Phone,
  MapPin,
  Droplet,
  Users,
  CreditCard,
  CalendarDays,
  Award,
} from "lucide-react";

export default function ProfileCard() {
  const { data, isLoading, error } = useGetUserProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <p className="mt-4 text-sm font-medium text-destructive">
              Failed to load profile. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const profile: UserProfile = data.data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400";
      case "INACTIVE":
        return "bg-slate-500/10 text-slate-700 border-slate-500/20 dark:text-slate-400";
      case "SUSPENDED":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400";
      case "DISPATCHER":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400";
      case "DRIVER":
        return "bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-400";
      case "CALLER":
        return "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatBloodGroup = (bloodGroup: string | null) => {
    if (!bloodGroup) return "Not set";
    return bloodGroup.replace("_", " ");
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    valueClassName,
  }: {
    icon: any;
    label: string;
    value: string;
    valueClassName?: string;
  }) => (
    <div className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p
            className={`mt-1 truncate text-sm font-semibold ${valueClassName || ""}`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Profile Card - Hero Section */}
      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Gradient Background Header */}
        <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-background sm:h-40" />

        <CardContent className="-mt-16 space-y-6 pb-8 sm:-mt-20">
          {/* Avatar and Name Section */}
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 shadow-xl">
                {profile.profileUrl ? (
                  <img
                    src={profile.profileUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-primary" />
                )}
              </div>
              {profile.emailVerified && (
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-emerald-500 shadow-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="mt-4 flex-1 sm:ml-6 sm:mt-0">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {profile.name}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm">{profile.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge
                    className={`border px-3 py-1 font-semibold ${getRoleBadgeColor(profile.role)}`}
                  >
                    <Award className="mr-1.5 h-3.5 w-3.5" />
                    {profile.role}
                  </Badge>
                  <Badge
                    className={`border px-3 py-1 font-semibold ${getStatusColor(profile.status)}`}
                  >
                    {profile.status}
                  </Badge>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-muted/50 p-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <p className="text-xs font-medium">Auth Provider</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {profile.authProvider === "GOOGLE" ? "Google" : "Email"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <p className="text-xs font-medium">Email Status</p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${profile.emailVerified ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
                  >
                    {profile.emailVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>

                <div className="col-span-2 space-y-1 sm:col-span-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <p className="text-xs font-medium">Member Since</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatDate(profile.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Caller-specific information */}
      {profile.role === "CALLER" && profile.caller && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Personal Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={Phone}
                label="Contact Number"
                value={profile.caller.contactNumber || "Not set"}
              />

              <InfoItem
                icon={CalendarDays}
                label="Date of Birth"
                value={formatDate(profile.caller.dateOfBirth)}
              />

              <InfoItem
                icon={Droplet}
                label="Blood Group"
                value={formatBloodGroup(profile.caller.bloodGroup)}
                valueClassName="text-destructive"
              />

              <InfoItem
                icon={Users}
                label="Gender"
                value={profile.caller.gender || "Not set"}
              />

              {profile.caller.address && (
                <div className="sm:col-span-2">
                  <InfoItem
                    icon={MapPin}
                    label="Address"
                    value={profile.caller.address}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Driver-specific information */}
      {profile.role === "DRIVER" && profile.driver && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Driver Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={Phone}
                label="Contact Number"
                value={profile.driver.contactNumber || "Not set"}
              />

              <InfoItem
                icon={CalendarDays}
                label="Date of Birth"
                value={formatDate(profile.driver.dateOfBirth)}
              />

              <InfoItem
                icon={Droplet}
                label="Blood Group"
                value={formatBloodGroup(profile.driver.bloodGroup)}
                valueClassName="text-destructive"
              />

              <InfoItem
                icon={Users}
                label="Gender"
                value={profile.driver.gender || "Not set"}
              />

              <InfoItem
                icon={CreditCard}
                label="License Number"
                value={profile.driver.licenseNumber || "Not set"}
              />

              <InfoItem
                icon={Calendar}
                label="License Expiry"
                value={formatDate(profile.driver.licenseExpiry)}
              />

              <InfoItem
                icon={Phone}
                label="Emergency Contact"
                value={profile.driver.emergencyContact || "Not set"}
              />

              {profile.driver.address && (
                <div className="sm:col-span-2">
                  <InfoItem
                    icon={MapPin}
                    label="Address"
                    value={profile.driver.address}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
