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
import DriverApplicationTable from "@/components/models/driver-application/driver-application-table";

import { useGetAllDriverApplication } from "@/hooks/driver.hooks";
import useDebounce from "@/hooks/debounce.hook";
import type {
  DriverQueryParams,
  DriverApprovalStatus,
} from "@/types/driver.type";

const LIMIT = 10;

const STATUS_TABS: { value: DriverApprovalStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Applications" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function DriverApplicationPage() {
  const [page, setPage] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState<
    DriverApprovalStatus | "ALL"
  >("PENDING");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params: DriverQueryParams = {
    page,
    limit: LIMIT,
    sortBy,
    sortOrder,
  };

  // Add approvalStatus to params (including "ALL")
  if (approvalStatus !== "ALL") {
    params.approvalStatus = approvalStatus;
  }

  if (debouncedSearchTerm) params.searchTerm = debouncedSearchTerm;

  // Debug: Check what params are being sent
  // console.log("Query Params:", params);

  const {
    data: response,
    isLoading,
    error,
  } = useGetAllDriverApplication(params);

  const applications = response?.data?.data ?? [];
  const meta = response?.data?.meta;

  const handleStatusChange = (value: DriverApprovalStatus | "ALL" | null) => {
    if (value === null) return;
    setApprovalStatus(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrderChange = (value: "asc" | "desc" | null) => {
    if (value === null) return;
    setSortOrder(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Driver Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and manage driver applications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {meta?.total ?? 0} Total Applications
          </Badge>
        </div>
      </div>

      {/* Filter Options: Mobile (Select Dropdown) vs Desktop (Tabs) */}
      <div>
        {/* Mobile View: Select Dropdown */}
        <div className="sm:hidden space-y-1.5">
          <Label>Filter by Status</Label>
          <Select value={approvalStatus} onValueChange={handleStatusChange}>
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
            value={approvalStatus}
            onValueChange={handleStatusChange}
            className="w-full"
          >
            <TabsList className="grid h-auto w-full max-w-2xl grid-cols-4">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="space-y-4">
        {/* Sort Controls Row */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy" className="text-xs">
              Sort By
            </Label>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                if (value !== null) handleSortChange(value);
              }}
            >
              <SelectTrigger id="sortBy" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Application Date</SelectItem>
                <SelectItem value="licenseExpiry">License Expiry</SelectItem>
                <SelectItem value="user.name">Name</SelectItem>
                <SelectItem value="user.email">Email</SelectItem>
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

        {/* Desktop Sort and Search */}
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy-desktop">Sort By</Label>
            <Select
              value={sortBy}
              onValueChange={(value) =>
                value !== null && handleSortChange(value)
              }
            >
              <SelectTrigger id="sortBy-desktop">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Application Date</SelectItem>
                <SelectItem value="licenseExpiry">License Expiry</SelectItem>
                <SelectItem value="user.name">Name</SelectItem>
                <SelectItem value="user.email">Email</SelectItem>
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
          <div className="space-y-2 sm:col-span-2 lg:col-span-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name, email, license, NID, contact..."
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
              placeholder="Search applications..."
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
          Failed to load driver applications. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <DriverApplicationTable applications={applications} />

          {meta && meta.totalPages > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Showing {applications.length} of {meta.total} results
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
