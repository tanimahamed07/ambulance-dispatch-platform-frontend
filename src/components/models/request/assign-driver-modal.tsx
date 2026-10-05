"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import { useGetAllDrivers, useAssignDriver } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import type { Driver } from "@/types/driver.type";

interface AssignDriverModalProps {
  emergencyId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function DriverCard({
  driver,
  isSelected,
  onSelect,
}: {
  driver: Driver;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative rounded-lg border p-4 cursor-pointer transition-all hover:border-primary ${
        isSelected ? "border-primary bg-primary/5" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <RadioGroupItem value={driver.id} id={driver.id} className="mt-1" />

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <label
                htmlFor={driver.id}
                className="font-medium cursor-pointer flex items-center gap-2"
              >
                {driver.user.name}
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
              </label>
              <p className="text-sm text-muted-foreground">
                {driver.user.email}
              </p>
            </div>
            <Badge variant={driver.isAvailable ? "default" : "secondary"}>
              {driver.isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Contact:</span>{" "}
              <span className="font-medium">{driver.contactNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground">License:</span>{" "}
              <span className="font-medium">{driver.licenseNumber}</span>
            </div>
          </div>

          {driver.ambulance && (
            <div className="pt-2 border-t">
              <p className="text-sm font-medium">
                🚑 {driver.ambulance.ambulanceNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                {driver.ambulance.vehicleType} • {driver.ambulance.model}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AssignDriverModal({
  emergencyId,
  isOpen,
  onOpenChange,
}: AssignDriverModalProps) {
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: response, isLoading } = useGetAllDrivers({
    assignable: "true",
    searchTerm: debouncedSearchTerm,
    limit: 50,
  });

  const { mutate: assignDriver, isPending } = useAssignDriver(emergencyId);

  const drivers = response?.data?.data ?? [];

  const handleAssign = () => {
    if (!selectedDriverId) return;

    assignDriver(
      { driverId: selectedDriverId },
      {
        onSuccess: () => {
          onOpenChange(false);
          setSelectedDriverId(null);
          setSearchTerm("");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Assign Driver</DialogTitle>
          <DialogDescription>
            Select an available driver with an ambulance to dispatch
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="driver-search">Search Drivers</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="driver-search"
                placeholder="Search by name, email, license, contact..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
              />
            </div>
          </div>

          {/* Driver List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {isLoading && (
              <div className="flex justify-center py-12">
                <Spinner className="h-8 w-8" />
              </div>
            )}

            {!isLoading && drivers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UserCircle className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-semibold">No available drivers</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchTerm
                    ? "Try adjusting your search criteria"
                    : "All drivers are currently busy or unavailable"}
                </p>
              </div>
            )}

            {!isLoading && drivers.length > 0 && (
              <RadioGroup
                value={selectedDriverId || ""}
                onValueChange={(value) => setSelectedDriverId(value as string)}
              >
                <div className="space-y-3">
                  {drivers.map((driver) => (
                    <DriverCard
                      key={driver.id}
                      driver={driver}
                      isSelected={selectedDriverId === driver.id}
                      onSelect={() => setSelectedDriverId(driver.id)}
                    />
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedDriverId || isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
