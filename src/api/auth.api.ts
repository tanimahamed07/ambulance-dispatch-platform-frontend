import apiClient from "@/lib/apiClient";
import { CallerRegistrationPayload, VerifyAccountPayload } from "@/types";

export function callerRegistration(payload: CallerRegistrationPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}

export function resendVerificationCode(payload: VerifyAccountPayload) {
  return apiClient("/auth/resend-verification-code", {
    method: "POST",
    body: payload,
  });
}
