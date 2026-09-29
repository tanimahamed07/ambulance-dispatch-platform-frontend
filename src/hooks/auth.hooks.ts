import {
  callerRegistration,
  forgotPassword,
  getMe,
  resendVerificationCode,
  resetPassword,
  userLogin,
  userLogout,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}