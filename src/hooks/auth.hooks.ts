import {
  callerRegistration,
  forgotPassword,
  getMe,
  googleOAuth,
  resendVerificationCode,
  resetPassword,
  userLogin,
  userLogout,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      // Invalidate and refetch user data after successful login
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      // Clear all cache on logout
      queryClient.clear();

      // Or specifically remove user data
      queryClient.removeQueries({ queryKey: ["user"] });

      // Reset query cache to initial state
      queryClient.invalidateQueries();
    },
  });
}

export function useGoogleOAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: () => {
      // Invalidate and refetch user data after successful Google login
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
