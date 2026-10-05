import apiClient from "@/lib/apiClient";
import { ApiResponse, IQuery, PaginatedResponse } from "@/types";

export interface InitiatePaymentPayload {
  tripId: string;
}

export interface InitiatePaymentResponse {
  paymentUrl: string;
}

export interface Payment {
  id: string;
  tripId: string;
  amount: number; // Decimal from backend
  currency: string;
  paymentGateway: string;
  merchantInvoiceNumber: string | null;
  bkashPaymentID: string | null;
  payerReference: string | null;
  status: "UNPAID" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  trxID: string | null;
  failureReason: string | null;
  paymentCreateTime: string | null;
  paymentExecuteTime: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  dispatchId: string;
  emergencyId: string;
  hospitalId: string | null;
  status:
    | "DISPATCHED"
    | "PICKED_UP"
    | "EN_ROUTE"
    | "ARRIVED"
    | "COMPLETED"
    | "CANCELLED";
  startedAt: string | null;
  pickedUpAt: string | null;
  hospitalArrivalAt: string | null;
  completedAt: string | null;
  distanceKm: number | null;
  fare: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentWithTrip extends Payment {
  trip: Trip;
}

export interface PaymentQueryParams extends IQuery {
  status?: "UNPAID" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
}

export function initiatePayment(payload: InitiatePaymentPayload) {
  return apiClient<ApiResponse<InitiatePaymentResponse>>("/payment/initiate", {
    method: "POST",
    body: payload,
  });
}

export function getAllMyPayments(params?: PaymentQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Payment>>>(
    "/payment/my-payments",
    {
      params,
    },
  );
}

export function getPaymentByTripId(tripId: string) {
  return apiClient<ApiResponse<PaymentWithTrip>>(
    `/payment/my-payment/${tripId}`,
  );
}
