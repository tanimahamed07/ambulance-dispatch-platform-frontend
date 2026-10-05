import apiClient from "@/lib/apiClient";
import { ApiResponse, IQuery, PaginatedResponse } from "@/types";
import type {
  InitiatePaymentPayload,
  RetryPaymentPayload,
  InitiatePaymentResponse,
  Payment,
  Trip,
  PaymentWithTrip,
  PaymentQueryParams,
  PaymentListResponse,
} from "@/types/payment.type";

export function initiatePayment(payload: InitiatePaymentPayload) {
  return apiClient<ApiResponse<InitiatePaymentResponse>>("/payment/initiate", {
    method: "POST",
    body: payload,
  });
}

export function getAllMyPayments(params?: PaymentQueryParams) {
  return apiClient<PaymentListResponse>("/payment/my-payments", {
    params,
  });
}

export function getPaymentByTripId(tripId: string) {
  return apiClient<ApiResponse<PaymentWithTrip>>(
    `/payment/my-payment/${tripId}`,
  );
}

export function retryPayment(payload: RetryPaymentPayload) {
  return apiClient<ApiResponse<InitiatePaymentResponse>>("/payment/retry", {
    method: "POST",
    body: payload,
  });
}

export function getDriverPayments(params?: PaymentQueryParams) {
  return apiClient<PaymentListResponse>("/payment/driver-payments", {
    params,
  });
}
