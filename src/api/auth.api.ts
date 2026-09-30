import apiClient from "@/lib/apiClient";
import type {
  AuthUser,
  CallerRegistrationPayload,
  forgotPasswordPayload,
  LoginPayload,
  resetPasswordPayload,
  VerifyAccountPayload,
} from "@/types";

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

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function forgotPassword(payload: forgotPasswordPayload) {
  return apiClient("/auth/forgot-password", { method: "POST", body: payload });
}

export function resetPassword(payload: resetPasswordPayload) {
  return apiClient("/auth/reset-password", { method: "POST", body: payload });
}

export function getMe() {
  return apiClient<{ data: AuthUser }>("/auth/me");
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}
