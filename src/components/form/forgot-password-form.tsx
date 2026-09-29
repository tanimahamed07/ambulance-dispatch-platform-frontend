"use client";

import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation";
import { getErrorMessage } from "@/lib/get-error-message";

import { FieldDescription, FieldError, FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: initialEmail,
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      const email = value.email.trim().toLowerCase();
      forgotPassword(
        { email },
        {
          onSuccess: () => {
            toast.add({
              title: "Code Sent",
              description: `Check ${email} for your 6-digit reset code`,
              type: "success",
            });
            const params = new URLSearchParams({ email });
            router.push(`/reset-password?${params.toString()}`);
          },
          onError: (err) => {
            toast.add({
              title: "Request Failed",
              description: getErrorMessage(err),
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 pl-10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                </div>
                <FieldDescription>
                  We&apos;ll email you a 6-digit code to reset your password.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Submit Button */}
        <Button
          disabled={isPending}
          type="submit"
          className="h-11 w-full font-medium shadow-sm"
        >
          {isPending ? (
            <>
              <Spinner />
              Sending code...
            </>
          ) : (
            "Send Reset Code"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
