import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllMyPayments,
  getPaymentByTripId,
  initiatePayment,
  retryPayment,
  type PaymentQueryParams,
} from "@/api/payment.api";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: initiatePayment,
  });
}

export function useRetryPayment() {
  return useMutation({
    mutationFn: retryPayment,
  });
}

export function useGetAllMyPayments(params?: PaymentQueryParams) {
  return useQuery({
    queryKey: ["my-payments", params],
    queryFn: () => getAllMyPayments(params),
  });
}

export function useGetPaymentByTripId(tripId: string | null) {
  return useQuery({
    queryKey: ["payment", tripId],
    queryFn: () => getPaymentByTripId(tripId!),
    enabled: !!tripId,
  });
}
