"use client";

import { useState } from "react";
import {
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Hash,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApplyDriver } from "@/hooks/driver.hooks";
import { applyDriverSchema } from "@/validation";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/lib/get-error-message";
import { FieldError, FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";

export default function ApplyDriverForm() {
  const router = useRouter();

  const { mutate: applyDriver, isPending: applyDriverPending } =
    useApplyDriver();

  const form = useForm({
    defaultValues: {
      contactNumber: "",
      address: "",
      licenseNumber: "",
      licenseUrl: "",
      licensePublicId: "",
      licenseExpiry: "",
      nidNumber: "",
    },

    validators: {
      onSubmit: applyDriverSchema,
    },

    onSubmit: ({ value }) => {
      const applyDriverData = {
        contactNumber: value.contactNumber,
        address: value.address,
        licenseNumber: value.licenseNumber,
        licenseUrl: value.licenseUrl,
        licensePublicId: value.licensePublicId,
        licenseExpiry: new Date(value.licenseExpiry),
        nidNumber: value.nidNumber,
      };

      applyDriver(applyDriverData, {
        onSuccess: () => {
          toast.add({
            title: "Application Submitted",
            description:
              "Your driver application has been submitted successfully",
            type: "success",
          });

          router.push("/caller");
        },

        onError: (err) => {
          toast.add({
            title: "Application Failed",
            description:
              getErrorMessage(err) || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="space-y-6">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Contact Number */}
          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Contact Number</Label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      placeholder="+8801XXXXXXXXX"
                      autoComplete="tel"
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

          {/* Address */}
          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Address</Label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your full address"
                      className="min-h-[80px] pl-10 resize-none"
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

          {/* License Number */}
          <form.Field name="licenseNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>License Number</Label>

                  <div className="relative">
                    <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter your license number"
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

          {/* License URL */}
          <form.Field name="licenseUrl">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>License URL</Label>

                  <div className="relative">
                    <Upload className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      placeholder="https://example.com/license.jpg"
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

          {/* License Public ID */}
          <form.Field name="licensePublicId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>License Public ID</Label>

                  <div className="relative">
                    <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter license public ID"
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

          {/* License Expiry */}
          <form.Field name="licenseExpiry">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>License Expiry Date</Label>

                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
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

          {/* NID Number */}
          <form.Field name="nidNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>NID Number</Label>

                  <div className="relative">
                    <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter your NID number"
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

          {/* Submit */}
          <Button
            disabled={applyDriverPending}
            type="submit"
            className="h-11 w-full font-medium shadow-sm"
          >
            {applyDriverPending ? (
              <>
                <Spinner />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
