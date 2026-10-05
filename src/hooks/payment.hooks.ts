import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDriverPayments,
  getAllMyPayments,
  getPaymentByTripId,
  initiatePayment,
  retryPayment,
} from "@/api/payment.api";
import {
  InitiatePaymentPayload,
  PaymentQueryParams,
  RetryPaymentPayload,
} from "@/types/payment.type";

export function useDriverPayments(params?: PaymentQueryParams) {
  return useQuery({
    queryKey: ["driver-payments", params],
    queryFn: () => getDriverPayments(params),
  });
}

export function useMyPayments(params?: PaymentQueryParams) {
  return useQuery({
    queryKey: ["my-payments", params],
    queryFn: () => getAllMyPayments(params),
  });
}

export function usePaymentByTripId(tripId: string) {
  return useQuery({
    queryKey: ["payment", tripId],
    queryFn: () => getPaymentByTripId(tripId),
    enabled: !!tripId,
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (payload: InitiatePaymentPayload) => initiatePayment(payload),
  });
}

export function useRetryPayment() {
  return useMutation({
    mutationFn: (payload: RetryPaymentPayload) => retryPayment(payload),
  });
}
