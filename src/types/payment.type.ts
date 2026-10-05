import type { IQuery } from "./api.type";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export interface InitiatePaymentPayload {
  tripId: string;
}

export interface RetryPaymentPayload {
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
  status: PaymentStatus;
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
  status?: PaymentStatus;
}

// Custom response type for payment list endpoint
export interface PaymentListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Legacy aliases for backward compatibility
export interface DriverPaymentsQuery extends PaymentQueryParams {}
export interface DriverPaymentsResponse extends PaymentListResponse {}
