"use client";

import { useState } from "react";
import { Search, UserCheck } from "lucide-react";

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
import DriversTable from "@/components/models/drivers/drivers-table";

import { useGetAllDrivers } from "@/hooks/driver.hooks";
import useDebounce from "@/hooks/debounce.hook";

const LIMIT = 10;

const AVAILABILITY_TABS = [
  { value: "ALL", label: "All Drivers" },
  { value: "true", label: "Available" },
  { value: "false", label: "Not Available" },
];

const AMBULANCE_TABS = [
  { value: "ALL", label: "All" },
  { value: "true", label: "With Ambulance" },
  { value: "false", label: "Without Ambulance" },
];

export default function AdminDriversPage() {
  const [page, setPage] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("ALL");
  const [ambulanceFilter, setAmbulanceFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: any = {
    page: page.toString(),
    limit: LIMIT.toString(),
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  if (availabilityFilter !== "ALL") {
    params.isAvailable = availabilityFilter;
  }

  if (ambulanceFilter !== "ALL") {
    params.hasAmbulance = ambulanceFilter;
  }

  if (debouncedSearchTerm) {
    params.searchTerm = debouncedSearchTerm;
  }

  const { data: response, isLoading, error } = useGetAllDrivers(params);

  const drivers = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const handleAvailabilityChange = (value: string | null) => {
    if (value === null) return;
    setAvailabilityFilter(value);
    setPage(1);
  };

  const handleAmbulanceFilterChange = (value: string | null) => {
    if (value === null) return;
    setAmbulanceFilter(value);
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
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <UserCheck className="h-6 w-6" />
            All Drivers
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage all approved drivers
          </p>
        </div>

        <Badge variant="secondary">{meta?.total ?? 0} Total Drivers</Badge>
      </div>

      {/* Availability Filter */}
      <div>
        <Label className="mb-2 block">Filter by Availability</Label>
        <div className="sm:hidden space-y-1.5">
          <Select
            value={availabilityFilter}
            onValueChange={handleAvailabilityChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_TABS.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden sm:block">
          <Tabs
            value={availabilityFilter}
            onValueChange={handleAvailabilityChange}
            className="w-full"
          >
            <TabsList className="grid h-auto w-full max-w-md grid-cols-3">
              {AVAILABILITY_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Ambulance Filter */}
      <div>
        <Label className="mb-2 block">Filter by Ambulance Assignment</Label>
        <div className="sm:hidden space-y-1.5">
          <Select
            value={ambulanceFilter}
            onValueChange={handleAmbulanceFilterChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              {AMBULANCE_TABS.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden sm:block">
          <Tabs
            value={ambulanceFilter}
            onValueChange={handleAmbulanceFilterChange}
            className="w-full"
          >
            <TabsList className="grid h-auto w-full max-w-md grid-cols-3">
              {AMBULANCE_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search Input */}
      <div className="space-y-2 max-w-md">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name, email, license, contact..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            type="search"
          />
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
          Failed to load drivers. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <DriversTable drivers={drivers} />

          {meta && meta.totalPages > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing {drivers.length} of {meta.total} results
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
