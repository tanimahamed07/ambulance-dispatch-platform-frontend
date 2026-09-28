import apiClient from "@/lib/apiClient";
import { CallerRegistrationPayload } from "@/types/auth.types";

export function callerRegistration(payload: CallerRegistrationPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}
