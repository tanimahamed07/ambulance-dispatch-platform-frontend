"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import AmbulanceTable from "@/components/models/ambulance/ambulance-table";
import { CreateAmbulanceModal } from "@/components/models/ambulance/create-ambulance-modal";

import { useGetAllAmbulance } from "@/hooks/ambulance.hooks";
import useDebounce from "@/hooks/debounce.hook";
import type {
  AmbulanceQueryParams,
  AmbulanceStatus,
  AmbulanceType,
} from "@/types/ambulence.type";

const LIMIT = 10;

const STATUS_TABS: { value: AmbulanceStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Status" },
  { value: "AVAILABLE", label: "Available" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "EN_ROUTE", label: "En Route" },
  { value: "OFFLINE", label: "Offline" },
  { value: "MAINTENANCE", label: "Maintenance" },
];

const VEHICLE_TYPES: { value: AmbulanceType | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Types" },
  { value: "AC", label: "AC" },
  { value: "NON_AC", label: "Non-AC" },
  { value: "ICU", label: "ICU" },
  { value: "FREEZER", label: "Freezer" },
  { value: "AIR", label: "Air" },
];

const DRIVER_ASSIGNMENT: {
  value: "ASSIGNED" | "UNASSIGNED" | "ALL";
  label: string;
}[] = [
  { value: "ALL", label: "All Ambulances" },
  { value: "ASSIGNED", label: "With Driver" },
  { value: "UNASSIGNED", label: "Without Driver" },
];

export default function AmbulancesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AmbulanceStatus | "ALL">("ALL");
  const [vehicleType, setVehicleType] = useState<AmbulanceType | "ALL">("ALL");
  const [driverAssignment, setDriverAssignment] = useState<
    "ASSIGNED" | "UNASSIGNED" | "ALL"
  >("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: AmbulanceQueryParams = { page, limit: LIMIT };
  if (status !== "ALL") params.status = status;
  if (vehicleType !== "ALL") params.vehicleType = vehicleType;
  if (driverAssignment !== "ALL") params.driverAssignment = driverAssignment;
  if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;

  const { data: response, isLoading, error } = useGetAllAmbulance(params);

  const ambulances = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const handleStatusChange = (value: AmbulanceStatus | "ALL" | null) => {
    if (value === null) return;
    setStatus(value as AmbulanceStatus | "ALL");
    setPage(1);
  };

  const handleVehicleTypeChange = (value: AmbulanceType | "ALL" | null) => {
    if (value === null) return;
    setVehicleType(value);
    setPage(1);
  };

  const handleDriverAssignmentChange = (
    value: "ASSIGNED" | "UNASSIGNED" | "ALL" | null,
  ) => {
    if (value === null) return;
    setDriverAssignment(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Ambulance Management
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage all ambulances in the system
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Ambulance
        </Button>
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
            <TabsList className="grid h-auto w-full max-w-3xl grid-cols-6">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Vehicle Type and Search Filters */}
      <div className="space-y-4">
        {/* Mobile Sort Controls */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {/* Vehicle Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="vehicleType-mobile" className="text-xs">
              Vehicle Type
            </Label>
            <Select value={vehicleType} onValueChange={handleVehicleTypeChange}>
              <SelectTrigger id="vehicleType-mobile" className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Driver Assignment Filter */}
          <div className="space-y-2">
            <Label htmlFor="driverAssignment-mobile" className="text-xs">
              Driver
            </Label>
            <Select
              value={driverAssignment}
              onValueChange={handleDriverAssignmentChange}
            >
              <SelectTrigger id="driverAssignment-mobile" className="w-full">
                <SelectValue placeholder="Assignment" />
              </SelectTrigger>
              <SelectContent>
                {DRIVER_ASSIGNMENT.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Vehicle Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={handleVehicleTypeChange}>
              <SelectTrigger id="vehicleType">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Driver Assignment Filter */}
          <div className="space-y-2">
            <Label htmlFor="driverAssignment">Driver Assignment</Label>
            <Select
              value={driverAssignment}
              onValueChange={handleDriverAssignmentChange}
            >
              <SelectTrigger id="driverAssignment">
                <SelectValue placeholder="Select Assignment" />
              </SelectTrigger>
              <SelectContent>
                {DRIVER_ASSIGNMENT.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="space-y-2 sm:col-span-2 lg:col-span-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by ambulance number, registration, model..."
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
              placeholder="Search ambulances..."
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
          Failed to load ambulances. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <AmbulanceTable ambulances={ambulances} />

          {meta && meta.totalPages > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing {ambulances.length} of {meta.total} results
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

      {/* Create Ambulance Modal */}
      <CreateAmbulanceModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
