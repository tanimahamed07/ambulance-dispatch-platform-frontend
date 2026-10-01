"use client";

import { Truck, Hash, Calendar, Car, Users } from "lucide-react";
import { useForm } from "@tanstack/react-form";

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
import { useCreateAmbulance } from "@/hooks/ambulance.hooks";
import { createAmbulanceSchema, getTodayString } from "@/validation";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/lib/get-error-message";
import { FieldError, FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";
import type { AmbulanceType } from "@/types/ambulence.type";

interface CreateAmbulanceFormProps {
  onSuccess?: () => void;
}

export default function CreateAmbulanceForm({
  onSuccess,
}: CreateAmbulanceFormProps) {
  const { mutate: createAmbulance, isPending } = useCreateAmbulance();

  const form = useForm({
    defaultValues: {
      ambulanceNumber: "",
      registrationNumber: "",
      registrationExpiry: "",
      vehicleType: undefined as unknown as AmbulanceType,
      model: "",
      capacity: 1,
    },

    validators: {
      onSubmit: createAmbulanceSchema,
    },

    onSubmit: ({ value }) => {
      const ambulanceData = {
        ambulanceNumber: value.ambulanceNumber,
        registrationNumber: value.registrationNumber,
        registrationExpiry: new Date(value.registrationExpiry).toISOString(),
        vehicleType: value.vehicleType,
        model: value.model,
        capacity: value.capacity,
      };

      createAmbulance(ambulanceData, {
        onSuccess: () => {
          toast.add({
            title: "Ambulance Created",
            description: "The ambulance has been added successfully",
            type: "success",
          });

          form.reset();
          onSuccess?.();
        },

        onError: (err) => {
          toast.add({
            title: "Creation Failed",
            description:
              getErrorMessage(err) || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

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
        {/* Ambulance Number */}
        <form.Field name="ambulanceNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Ambulance Number</Label>

                <div className="relative">
                  <Truck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g., AMB-101"
                    className="h-11 pl-10"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Registration Number */}
        <form.Field name="registrationNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Registration Number</Label>

                <div className="relative">
                  <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g., DHAKA-METRO-CHA-11-2233"
                    className="h-11 pl-10"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Registration Expiry */}
        <form.Field name="registrationExpiry">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Registration Expiry Date</Label>

                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    min={getTodayString()}
                    className="h-11 pl-10"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Vehicle Type */}
        <form.Field name="vehicleType">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Vehicle Type</Label>

                <Select
                  value={field.state.value ?? ""}
                  onValueChange={(value) =>
                    field.handleChange(value as AmbulanceType)
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    className="h-11"
                    aria-invalid={isInvalid}
                  >
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">❄️ AC</SelectItem>
                    <SelectItem value="NON_AC">🌡️ Non-AC</SelectItem>
                    <SelectItem value="ICU">🏥 ICU</SelectItem>
                    <SelectItem value="FREEZER">🧊 Freezer</SelectItem>
                    <SelectItem value="AIR">✈️ Air</SelectItem>
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Model */}
        <form.Field name="model">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Vehicle Model</Label>

                <div className="relative">
                  <Car className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g., Toyota HiAce 2022"
                    className="h-11 pl-10"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Capacity */}
        <form.Field name="capacity">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Patient Capacity</Label>

                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    max={20}
                    placeholder="e.g., 1"
                    className="h-11 pl-10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Submit */}
        <Button
          disabled={isPending}
          type="submit"
          className="h-11 w-full font-medium shadow-sm"
        >
          {isPending ? (
            <>
              <Spinner />
              Creating Ambulance...
            </>
          ) : (
            "Create Ambulance"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
