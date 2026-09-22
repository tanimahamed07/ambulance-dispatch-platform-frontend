"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocateFixed, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMERGENCY_TYPES = ["BASIC", "ICU", "FREEZER", "CCU"] as const;

export default function QuickEmergencyStrip() {
  const router = useRouter();

  const [pickupAddress, setPickupAddress] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [emergencyType, setEmergencyType] = useState<string>("BASIC");

  function handleDummyLocation() {
    setPickupAddress("Dhanmondi 27, Dhaka (Current Location)");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      pickupAddress: pickupAddress || "Dhanmondi, Dhaka",
      patientPhone: patientPhone || "01700000000",
      emergencyType: emergencyType,
    });

    const targetUrl = `/caller/request-emergency?${params.toString()}`;
    router.push(targetUrl);
  }

  return (
    <section className="border-y bg-background">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-6xl flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-6"
      >
        {/* Pickup Address Field */}
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Enter pickup location or address..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleDummyLocation}
              title="Set mock current location"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
            >
              <LocateFixed className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="sm:w-44">
          <Input
            type="tel"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            placeholder="Phone number"
          />
        </div>

        {/* Emergency Type Selection */}
        <div className="w-full sm:w-60">
          <Select value={emergencyType} onValueChange={setEmergencyType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {EMERGENCY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type} Ambulance
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Button */}
        <Button type="submit" className="shrink-0">
          <Ambulance className="mr-2 h-4 w-4" />
          Get Ambulance Now
        </Button>
      </form>
    </section>
  );
}
