"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import HospitalTable from "@/components/models/hospital/hospital-table";
import { CreateHospitalModal } from "@/components/models/hospital/create-hospital-modal";

import { useGetHospitals } from "@/hooks/hospital.hooks";
import useDebounce from "@/hooks/debounce.hook";
import type {
  HospitalStatus,
  HospitalQueryParams,
} from "@/types/hospital.type";

const LIMIT = 10;

const STATUS_TABS: { value: HospitalStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

const EMERGENCY_AVAILABILITY: {
  value: "ALL" | "true" | "false";
  label: string;
}[] = [
  { value: "ALL", label: "All Hospitals" },
  { value: "true", label: "Emergency Available" },
  { value: "false", label: "No Emergency" },
];

export default function HospitalsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<HospitalStatus | "ALL">("ALL");
  const [emergencyAvailable, setEmergencyAvailable] = useState<
    "ALL" | "true" | "false"
  >("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: HospitalQueryParams = { page, limit: LIMIT };
  if (status !== "ALL") params.status = status;
  if (emergencyAvailable !== "ALL")
    params.emergencyAvailable = emergencyAvailable === "true";
  if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;

  const { data: response, isLoading, error } = useGetHospitals(params);

  const hospitals = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const handleStatusChange = (value: HospitalStatus | "ALL" | null) => {
    if (value === null) return;
    setStatus(value as HospitalStatus | "ALL");
    setPage(1);
  };

  const handleEmergencyAvailabilityChange = (
    value: "ALL" | "true" | "false" | null,
  ) => {
    if (value === null) return;
    setEmergencyAvailable(value);
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
            Hospital Management
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage all hospitals in the system
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{meta?.total ?? 0} Total Hospitals</Badge>
          <Button
            className="w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
          <CreateHospitalModal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
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
            <TabsList className="grid h-auto w-full max-w-xl grid-cols-3">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Emergency Availability and Search Filters */}
      <div className="space-y-4">
        {/* Mobile Filters */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {/* Emergency Availability Filter */}
          <div className="space-y-2">
            <Label htmlFor="emergency-mobile" className="text-xs">
              Emergency Service
            </Label>
            <Select
              value={emergencyAvailable}
              onValueChange={handleEmergencyAvailabilityChange}
            >
              <SelectTrigger id="emergency-mobile" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMERGENCY_AVAILABILITY.map((option) => (
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
          {/* Emergency Availability Filter */}
          <div className="space-y-2">
            <Label htmlFor="emergency">Emergency Service</Label>
            <Select
              value={emergencyAvailable}
              onValueChange={handleEmergencyAvailabilityChange}
            >
              <SelectTrigger id="emergency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMERGENCY_AVAILABILITY.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="space-y-2 sm:col-span-1 lg:col-span-3">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by hospital name, phone, address..."
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
              placeholder="Search hospitals..."
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
          Failed to load hospitals. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <HospitalTable hospitals={hospitals} />

          {meta && meta.totalPages > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing {hospitals.length} of {meta.total} results
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
