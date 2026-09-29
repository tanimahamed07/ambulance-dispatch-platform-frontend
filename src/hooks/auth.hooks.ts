import {
  callerRegistration,
  forgotPassword,
  resendVerificationCode,
  resetPassword,
  userLogin,
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

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}
export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}
export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
