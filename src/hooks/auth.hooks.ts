import {
  callerRegistration,
  resendVerificationCode,
  verifyAccount,
} from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useRegistration() {
  return useMutation({
    mutationFn: callerRegistration,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}
export function useResendVerificationCode() {
  return useMutation({
    mutationFn: resendVerificationCode,
  });
}
