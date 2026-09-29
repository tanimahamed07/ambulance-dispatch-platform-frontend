"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResendVerificationCode, useVerifyAccount } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";
import { toast } from "../ui/toast";

// Backend cooldown (60s) er shathe match kora
const RESEND_COOLDOWN = 60;

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [isInvalid, setIsInvalid] = useState(false);
  const [otp, setOtp] = useState("");

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const { mutate: verifyCaller, isPending: isVerifying } = useVerifyAccount();
  const { mutate: resendCode, isPending: isResending } =
    useResendVerificationCode();

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    verifyCaller(
      { email, otp },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Verification Successful",
            description: "Welcome to Rescue!",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Verification failure",
            description: getErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  const handleResend = () => {
    resendCode(
      { email, otp: "" },
      {
        onSuccess: () => {
          setResendTimer(RESEND_COOLDOWN);
          setOtp("");
          setIsInvalid(false);

          toast.add({
            title: "Code Sent",
            description: "A new verification code has been sent to your email",
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

  return (
    <form
      id="otp-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleOTP();
      }}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <p className="text-center text-sm text-muted-foreground lg:text-left">
          Verification code sent to
        </p>

        <p className="mt-1 break-all text-center text-sm font-medium lg:text-left">
          {email}
        </p>
      </div>

      {/* OTP */}
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor="otp">Verification code</FieldLabel>

        <InputOTP
          maxLength={6}
          autoComplete="one-time-code"
          name="otp"
          id="otp"
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (isInvalid) {
              setIsInvalid(false);
            }
          }}
        >
          <InputOTPGroup className="flex w-full justify-between gap-2">
            <InputOTPSlot
              index={0}
              className="h-12 w-12 rounded-md border border-input bg-background"
            />
            <InputOTPSlot
              index={1}
              className="h-12 w-12 rounded-md border border-input bg-background"
            />
            <InputOTPSlot
              index={2}
              className="h-12 w-12 rounded-md border border-input bg-background"
            />
            <InputOTPSlot
              index={3}
              className="h-12 w-12 rounded-md border border-input bg-background"
            />
            <InputOTPSlot
              index={4}
              className="h-12 w-12 rounded-md border border-input bg-background"
            />
            <InputOTPSlot
              index={5}
              className="h-12 w-12 rounded-md border border-input bg-background"
            />
          </InputOTPGroup>
        </InputOTP>

        <FieldDescription>
          Enter the 6-digit code sent to your email.
        </FieldDescription>
      </Field>

      {/* Verify Button */}
      <Button
        type="submit"
        disabled={isVerifying}
        className="h-11 w-full font-medium shadow-sm"
      >
        {isVerifying ? "Verifying..." : "Verify Email"}
      </Button>

      {/* Resend */}
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
