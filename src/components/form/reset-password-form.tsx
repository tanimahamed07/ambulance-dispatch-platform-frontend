"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordSchema } from "@/validation";
import { getErrorMessage } from "@/lib/get-error-message";
import { FieldDescription, FieldError, FieldGroup } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useForgotPassword, useResetPassword } from "@/hooks";

const RESEND_COOLDOWN = 60;

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // Mutation hooks
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  const { mutate: resendCode, isPending: isResending } = useForgotPassword();

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: ({ value }) => {
      // Validation Check for OTP
      if (otp.length !== 6) {
        setIsOtpInvalid(true);
        return;
      }

      // Backend expects: { email, otp, newPassword }
      resetPassword(
        {
          email,
          otp,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            setIsDone(true);
            toast.add({
              title: "Password Updated",
              description: "Sign in with your new password",
              type: "success",
            });
          },

          onError: (err) => {
            toast.add({
              title: "Reset Failed",
              description: getErrorMessage(err),
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleResend = () => {
    resendCode(
      { email },
      {
        onSuccess: () => {
          setResendTimer(RESEND_COOLDOWN);
          setOtp("");
          setIsOtpInvalid(false);

          toast.add({
            title: "Code Sent",
            description: "A new reset code has been sent to your email",
            type: "success",
          });
        },

        onError: (err) => {
          toast.add({
            title: "Resend Failed",
            description: getErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  const minutes = Math.floor(resendTimer / 60);
  const seconds = resendTimer % 60;
  const formattedTimer = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  if (!email) {
    return null;
  }

  /* Success State */
  if (isDone) {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-border bg-muted/30 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <ShieldCheck className="h-7 w-7 text-destructive" />
          </div>

          <p className="mt-4 text-base font-medium">Password updated</p>

          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            Your Rescue password has been reset. Use your new password to sign
            in.
          </p>
        </div>

        <Button
          type="button"
          className="h-11 w-full font-medium shadow-sm"
          onClick={() => router.push("/login")}
        >
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const invalid = otp.length !== 6;
        setIsOtpInvalid(invalid);

        if (!invalid) {
          form.handleSubmit();
        }
      }}
    >
      {/* Email Info */}
      <div>
        <p className="text-center text-sm text-muted-foreground lg:text-left">
          Reset code sent to
        </p>
        <p className="mt-1 break-all text-center text-sm font-medium lg:text-left">
          {email}
        </p>
      </div>

      <FieldGroup>
        {/* OTP Input */}
        <div className="space-y-2">
          <Label htmlFor="otp">Verification code</Label>

          <InputOTP
            maxLength={6}
            id="otp"
            name="otp"
            autoComplete="one-time-code"
            value={otp}
            onChange={(value) => {
              setOtp(value);
              if (isOtpInvalid && value.length === 6) {
                setIsOtpInvalid(false);
              }
            }}
          >
            <InputOTPGroup className="flex w-full justify-between gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <InputOTPSlot
                  key={`otp-slot-${index + 1}`}
                  index={index}
                  className="h-12 w-12 rounded-md border border-input bg-background"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <FieldDescription>
            Enter the 6-digit code sent to your email.
          </FieldDescription>

          {isOtpInvalid && (
            <p className="text-xs text-destructive">
              Please enter the complete 6-digit code
            </p>
          )}
        </div>

        {/* New Password */}
        <form.Field name="newPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>New password</Label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    className="h-11 pl-10 pr-10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Confirm Password */}
        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Confirm new password</Label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                    className="h-11 pl-10 pr-10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Submit Button */}
        <Button
          disabled={isResetting}
          type="submit"
          className="h-11 w-full font-medium shadow-sm"
        >
          {isResetting ? (
            <>
              <Spinner />
              Updating password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </FieldGroup>

      {/* Resend OTP Block */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Didn&apos;t receive the code?</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Check your spam folder or request a new code.
            </p>
          </div>

          <Button
            disabled={resendTimer > 0 || isResending}
            type="button"
            variant="ghost"
            onClick={handleResend}
            className="shrink-0"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isResending ? "animate-spin" : ""}`}
            />

            {resendTimer > 0 ? formattedTimer : "Resend"}
          </Button>
        </div>
      </div>
    </form>
  );
}
