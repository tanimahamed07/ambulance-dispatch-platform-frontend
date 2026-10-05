export type PaymentStatus = "UNPAID" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface Payment {
  id: string;
  tripId: string;
  amount: number;
  currency: string;
  paymentGateway: string;
  merchantInvoiceNumber: string | null;
  bkashPaymentID: string | null;
  payerReference: string | null;
  status: PaymentStatus;
  trxID: string | null;
  paymentCreateTime: string | null;
  paymentExecuteTime: string | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DriverPaymentsQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: PaymentStatus;
}

export interface DriverPaymentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Payment[];
}
