"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  MapPin,
  Calendar as CalendarIcon,
  CreditCard,
  FileCheck,
  FileCode,
  FileText,
  Phone,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Placeholder Zod Schema (adjust as per your @/validation schema)
export const driverApplicationSchema = z.object({
  contactNumber: z
    .string()
    .min(11, "Contact number must be at least 11 digits"),
  nidNumber: z.string().min(10, "NID number is required"),
  address: z.string().min(5, "Address is required"),
  licenseNumber: z.string().min(5, "License number is required"),
  licenseExpiry: z.date("License expiry date is required"),
  licenseUrl: z.string().url("Please enter a valid URL"),
  licensePublicId: z.string().min(1, "Public ID is required"),
});

export default function DriverApplicationForm() {
  type DriverFormValues = z.infer<typeof driverApplicationSchema>;

  const defaultValues: DriverFormValues = {
    contactNumber: "01700000000",
    nidNumber: "1234567890",
    address: "Dhaka, Bangladesh",
    licenseNumber: "DL-1234567",
    licenseExpiry: new Date(),
    licenseUrl: "https://cloudinary.com/sample.pdf",
    licensePublicId: "license_12345",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: driverApplicationSchema,
    },
    onSubmit: async ({ value }) => {
      // Just UI representation (No API fetch)
      // console.log("Form Submitted Values:", value);
    },
  });

  return (
    <Card className="mx-auto w-full max-w-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Driver Application</CardTitle>
        <CardDescription>
          Apply to become an ambulance driver. Please provide accurate details
          for verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Contact & NID */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Contact Number */}
            <form.Field name="contactNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Contact Number</Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+8801700000000"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                    {isInvalid && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* NID Number */}
            <form.Field name="nidNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>NID Number</Label>
                    <div className="relative">
                      <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="1234567890"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                    {isInvalid && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
          </div>

          {/* Address */}
          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Present Address</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="House, Road, City..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                  {isInvalid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Driving License Number & Expiry Date */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* License Number */}
            <form.Field name="licenseNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Driving License Number</Label>
                    <div className="relative">
                      <FileCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="DL-1234567"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                    {isInvalid && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* License Expiry */}
            <form.Field name="licenseExpiry">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>License Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "h-11 w-full justify-start pl-3 text-left font-normal",
                            !field.state.value && "text-muted-foreground",
                          )}
                        >
                          {field.state.value ? (
                            format(field.state.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => date && field.handleChange(date)}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    {isInvalid && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
          </div>

          {/* License Document Info */}
          <div className="space-y-4 rounded-lg border border-dashed p-4 bg-muted/30">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Driving License Document Info</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* License URL */}
              <form.Field name="licenseUrl">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Document URL</Label>
                      <div className="relative">
                        <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          placeholder="https://cloudinary.com/..."
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-11 pl-10"
                        />
                      </div>
                      {isInvalid ? (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Direct link to uploaded license document.
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* License Public ID */}
              <form.Field name="licensePublicId">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Public ID / Key</Label>
                      <div className="relative">
                        <FileCode className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="license_12345"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-11 pl-10"
                        />
                      </div>
                      {isInvalid ? (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Cloudinary or S3 file identifier.
                        </p>
                      )}
                    </div>
                  );
                }}
              </form.Field>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="h-11 w-full font-medium shadow-sm">
            Submit Driver Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
