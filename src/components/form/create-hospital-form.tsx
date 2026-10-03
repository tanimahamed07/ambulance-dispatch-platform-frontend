"use client";

import dynamic from "next/dynamic";
import { Hospital, Phone, Mail, Tag, Navigation } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateHospital } from "@/hooks/hospital.hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { FieldError, FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";
import type { HospitalStatus } from "@/types/hospital.type";
import { Badge } from "../ui/badge";
import { X, MapPin } from "lucide-react";
import { createHospitalSchema } from "@/validation/hospital.validation";
import { toast } from "../ui/toast";

const LocationPicker = dynamic(
  () => import("@/components/location/location-picker"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-80 items-center justify-center rounded-xl border bg-muted">
        <Spinner />
      </div>
    ),
  },
);

interface CreateHospitalFormProps {
  onSuccess?: () => void;
}

export default function CreateHospitalForm({
  onSuccess,
}: CreateHospitalFormProps) {
  const { mutate: createHospital, isPending } = useCreateHospital();
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      latitude: 0,
      longitude: 0,
      emergencyAvailable: true,
      status: "ACTIVE" as HospitalStatus,
    },

    validators: {
      onSubmit: createHospitalSchema,
    },

    onSubmit: ({ value }) => {
      const hospitalData = {
        name: value.name,
        phone: value.phone,
        email: value.email || undefined,
        address: value.address,
        latitude: value.latitude,
        longitude: value.longitude,
        emergencyAvailable: value.emergencyAvailable,
        specialties,
        status: value.status,
      };

      createHospital(hospitalData, {
        onSuccess: () => {
          toast.add({
            title: "Success",
            description: "Hospital created successfully",
            type: "success",
          });
          form.reset();
          setSpecialties([]);
          onSuccess?.();
        },

        onError: (err) => {
          toast.add({
            title: "Failed to create hospital",
            description:
              getErrorMessage(err) || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.add({
        title: "Error",
        type: "error",
        description: "Your browser does not support location services.",
      });
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          );

          let address = "";

          if (response.ok) {
            const data = await response.json();
            address = data.display_name || "";
          }

          form.setFieldValue("latitude", latitude);
          form.setFieldValue("longitude", longitude);

          if (address) {
            form.setFieldValue("address", address);
          }

          toast.add({
            title: "Location captured",
            description: "Location captured successfully",
            type: "success",
          });
        } catch {
          form.setFieldValue("latitude", latitude);
          form.setFieldValue("longitude", longitude);

          toast.add({
            title: "Coordinates captured",
            description: "Coordinates captured. Please enter the address.",
            type: "success",
          });
        } finally {
          setIsGettingLocation(false);
        }
      },

      (error) => {
        let message = "Unable to get your current location.";

        if (error.code === error.PERMISSION_DENIED) {
          message =
            "Location permission was denied. Please allow location access.";
        }

        if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Your current location is unavailable.";
        }

        if (error.code === error.TIMEOUT) {
          message = "Location request timed out. Please try again.";
        }

        toast.add({
          title: "Location error",
          description: message,
          type: "error",
        });
        setIsGettingLocation(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* Hospital Name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Hospital Name</Label>
                <div className="relative">
                  <Hospital className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    placeholder="e.g., City General Hospital"
                    className="pl-9"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                {isInvalid && (
                  <FieldError>{field.state.meta.errors?.join(", ")}</FieldError>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* Phone */}
        <form.Field name="phone">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type="tel"
                    placeholder="e.g., +880123456789"
                    className="pl-9"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                {isInvalid && (
                  <FieldError>{field.state.meta.errors?.join(", ")}</FieldError>
                )}
              </div>
            );
          }}
        </form.Field>
      </FieldGroup>

      <FieldGroup>
        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email (Optional)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="e.g., info@hospital.com"
                    className="pl-9"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                {isInvalid && (
                  <FieldError>{field.state.meta.errors?.join(", ")}</FieldError>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* Status */}
        <form.Field name="status">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Status</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(value as HospitalStatus)
                }
                disabled={isPending}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>
      </FieldGroup>

      {/* Address */}
      <form.Field name="address">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={field.name}
                  placeholder="e.g., 123 Main St, Dhaka"
                  className="pl-9"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                />
              </div>
              {isInvalid && (
                <FieldError>{field.state.meta.errors?.join(", ")}</FieldError>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Map Location Picker */}
      <form.Field name="latitude">
        {(latitudeField) => (
          <form.Field name="longitude">
            {(longitudeField) => (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label className="text-sm font-medium">
                      Hospital Location{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Select the exact location on the map.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGetCurrentLocation}
                    disabled={isGettingLocation || isPending}
                    className="h-9 shrink-0 gap-2"
                  >
                    {isGettingLocation ? (
                      <>
                        <Spinner className="h-3.5 w-3.5" />
                        Getting...
                      </>
                    ) : (
                      <>
                        <Navigation className="h-3.5 w-3.5" />
                        Current
                      </>
                    )}
                  </Button>
                </div>

                <LocationPicker
                  latitude={latitudeField.state.value}
                  longitude={longitudeField.state.value}
                  onLocationChange={(latitude, longitude, address) => {
                    latitudeField.handleChange(latitude);
                    longitudeField.handleChange(longitude);

                    if (address) {
                      form.setFieldValue("address", address);
                    }
                  }}
                />

                {latitudeField.state.value !== 0 &&
                  longitudeField.state.value !== 0 && (
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Location Selected
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Latitude: {latitudeField.state.value.toFixed(6)}
                            <br />
                            Longitude: {longitudeField.state.value.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {((latitudeField.state.meta.isTouched &&
                  !latitudeField.state.meta.isValid) ||
                  (longitudeField.state.meta.isTouched &&
                    !longitudeField.state.meta.isValid)) && (
                  <FieldError>
                    {[
                      ...latitudeField.state.meta.errors,
                      ...longitudeField.state.meta.errors,
                    ].join(", ")}
                  </FieldError>
                )}
              </div>
            )}
          </form.Field>
        )}
      </form.Field>

      {/* Specialties */}
      <div className="space-y-2">
        <Label htmlFor="specialties">Specialties</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="specialties"
              placeholder="e.g., Cardiology"
              className="pl-9"
              value={specialtyInput}
              onChange={(e) => setSpecialtyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSpecialty();
                }
              }}
              disabled={isPending}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddSpecialty}
            disabled={isPending || !specialtyInput.trim()}
          >
            Add
          </Button>
        </div>
        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="gap-1">
                {specialty}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialty(specialty)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Available */}
      <form.Field name="emergencyAvailable">
        {(field) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => field.handleChange(!!checked)}
              disabled={isPending}
            />
            <Label
              htmlFor={field.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Emergency Service Available
            </Label>
          </div>
        )}
      </form.Field>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Spinner className="mr-2 h-4 w-4" />}
        Create Hospital
      </Button>
    </form>
  );
}
