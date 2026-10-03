"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TablePagination from "@/components/ui/table-pagination";
import MyTripsTable from "@/components/models/trip/my-trips-table";

import { useGetMyTrips } from "@/hooks/trip.hooks";
import useDebounce from "@/hooks/debounce.hook";
import type { IQuery } from "@/types";
import type {
  TripStatus,
  EmergencyType,
  Priority,
} from "@/types/emergency.type";

const LIMIT = 10;

const STATUS_TABS: { value: TripStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Trips" },
  { value: "DISPATCHED", label: "Dispatched" },
  { value: "EN_ROUTE", label: "En Route" },
  { value: "PICKED_UP", label: "Picked Up" },
  { value: "AT_HOSPITAL", label: "At Hospital" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function MyTripPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TripStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [emergencyType, setEmergencyType] = useState<EmergencyType | "ALL">(
    "ALL",
  );
  const [priority, setPriority] = useState<Priority | "ALL">("ALL");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: IQuery = {
    page,
    limit: LIMIT,
    sortBy,
    sortOrder,
  };

  // Add filters to params
  if (status !== "ALL") params.status = status;
  if (emergencyType !== "ALL") params.emergencyType = emergencyType;
  if (priority !== "ALL") params.priority = priority;
  if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;

  const { data: response, isLoading, error } = useGetMyTrips(params);

  const trips = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const handleStatusChange = (value: TripStatus | "ALL" | null) => {
    if (value === null) return;
    setStatus(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSortChange = (value: string | null) => {
    if (value === null) return;
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrderChange = (value: "asc" | "desc" | null) => {
    if (value === null) return;
    setSortOrder(value);
    setPage(1);
  };

  const handleEmergencyTypeChange = (value: EmergencyType | "ALL" | null) => {
    if (value === null) return;
    setEmergencyType(value);
    setPage(1);
  };

  const handlePriorityChange = (value: Priority | "ALL" | null) => {
    if (value === null) return;
    setPriority(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Trips</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your trips
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{meta?.total ?? 0} Total Trips</Badge>
        </div>
      </div>

      {/* Filter Options: Mobile (Select Dropdown) vs Desktop (Tabs) */}
      <div>
        {/* Mobile View: Select Dropdown */}
        <div className="sm:hidden space-y-1.5">
          <Label>Filter by Status</Label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_TABS.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop View: Tabs */}
        <div className="hidden sm:block">
          <Tabs
            value={status}
            onValueChange={handleStatusChange}
            className="w-full"
          >
            <TabsList className="grid h-auto w-full max-w-5xl grid-cols-7">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Mobile Filter Controls */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {/* Emergency Type */}
          <div className="space-y-2">
            <Label htmlFor="emergencyType-mobile" className="text-xs">
              Emergency Type
            </Label>
            <Select
              value={emergencyType}
              onValueChange={handleEmergencyTypeChange}
            >
              <SelectTrigger id="emergencyType-mobile" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="ACCIDENT">Accident</SelectItem>
                <SelectItem value="CARDIAC">Cardiac</SelectItem>
                <SelectItem value="STROKE">Stroke</SelectItem>
                <SelectItem value="PREGNANCY">Pregnancy</SelectItem>
                <SelectItem value="TRAUMA">Trauma</SelectItem>
                <SelectItem value="BREATHING_PROBLEM">
                  Breathing Problem
                </SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority-mobile" className="text-xs">
              Priority
            </Label>
            <Select value={priority} onValueChange={handlePriorityChange}>
              <SelectTrigger id="priority-mobile" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy" className="text-xs">
              Sort By
            </Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger id="sortBy" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Start Date</SelectItem>
                <SelectItem value="status">Trip Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder" className="text-xs">
              Order
            </Label>
            <Select value={sortOrder} onValueChange={handleSortOrderChange}>
              <SelectTrigger id="sortOrder" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Filter and Sort Controls */}
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Emergency Type */}
          <div className="space-y-2">
            <Label htmlFor="emergencyType-desktop">Emergency Type</Label>
            <Select
              value={emergencyType}
              onValueChange={handleEmergencyTypeChange}
            >
              <SelectTrigger id="emergencyType-desktop">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="ACCIDENT">Accident</SelectItem>
                <SelectItem value="CARDIAC">Cardiac</SelectItem>
                <SelectItem value="STROKE">Stroke</SelectItem>
                <SelectItem value="PREGNANCY">Pregnancy</SelectItem>
                <SelectItem value="TRAUMA">Trauma</SelectItem>
                <SelectItem value="BREATHING_PROBLEM">
                  Breathing Problem
                </SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority-desktop">Priority</Label>
            <Select value={priority} onValueChange={handlePriorityChange}>
              <SelectTrigger id="priority-desktop">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy-desktop">Sort By</Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger id="sortBy-desktop">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Start Date</SelectItem>
                <SelectItem value="status">Trip Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder-desktop">Order</Label>
            <Select value={sortOrder} onValueChange={handleSortOrderChange}>
              <SelectTrigger id="sortOrder-desktop">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by patient name, phone..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                type="search"
              />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="space-y-2 sm:hidden">
          <Label htmlFor="search-mobile" className="text-xs">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search-mobile"
              placeholder="Search trips..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              type="search"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading && (
        <div className="flex justify-center rounded-lg border p-12">
          <Spinner className="h-8 w-8" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center text-sm text-destructive">
          Failed to load trips. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <MyTripsTable trips={trips} />

          {meta && meta.totalPages > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing {trips.length} of {meta.total} results
              </p>

              <TablePagination
                page={page}
                totalPages={meta.totalPages}
                handlePageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
