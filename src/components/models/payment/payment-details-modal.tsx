"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

import { useGetPaymentByTripId, useRetryPayment } from "@/hooks/payment.hooks";
import type { Payment, Trip } from "@/api/payment.api";

const STATUS_CONFIG = {
  COMPLETED: {
    label: "Completed",
    variant: "default" as const,
  },
  PENDING: {
    label: "Pending",
    variant: "secondary" as const,
  },
  UNPAID: {
    label: "Unpaid",
    variant: "outline" as const,
  },
  FAILED: {
    label: "Failed",
    variant: "destructive" as const,
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "outline" as const,
  },
} as const;

const TRIP_STATUS_CONFIG = {
  DISPATCHED: { label: "Dispatched" },
  PICKED_UP: { label: "Picked Up" },
  EN_ROUTE: { label: "En Route" },
  ARRIVED: { label: "Arrived" },
  COMPLETED: { label: "Completed" },
  CANCELLED: { label: "Cancelled" },
} as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: ReactNode }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

const fmt = (date: string | null) =>
  date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : null;

function TripTimeline({ trip }: { trip: Trip }) {
  const steps = [
    { label: "Trip started", at: trip.startedAt },
    { label: "Patient picked up", at: trip.pickedUpAt },
    { label: "Arrived at hospital", at: trip.hospitalArrivalAt },
    { label: "Trip completed", at: trip.completedAt },
  ];

  return (
    <ul className="space-y-2">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center gap-2 text-sm">
          {step.at ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={step.at ? "font-medium" : "text-muted-foreground"}>
            {step.label}
          </span>
          {step.at && (
            <span className="ml-auto text-xs text-muted-foreground">
              {fmt(step.at)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function PaymentStatusBadge({ status }: { status: Payment["status"] }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

interface PaymentDetailsModalProps {
  tripId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentDetailsModal({
  tripId,
  isOpen,
  onOpenChange,
}: PaymentDetailsModalProps) {
  const router = useRouter();
  const { data: response, isLoading, error } = useGetPaymentByTripId(tripId);
  const { mutate: retryPayment, isPending: isRetrying } = useRetryPayment();

  const payment = response?.data;
  const trip = payment?.trip;

  const handleRetryPayment = () => {
    if (!tripId) return;

    retryPayment(
      { tripId },
      {
        onSuccess: (response) => {
          const paymentUrl = response.data?.paymentUrl;
          if (paymentUrl) {
            toast.add({
              type: "success",
              title: "Redirecting to Payment",
              description: "Please complete your payment on bKash",
            });
            // Redirect to bKash payment page
            window.location.href = paymentUrl;
          } else {
            toast.add({
              type: "error",
              title: "Error",
              description: "Payment URL not received",
            });
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to retry payment";

          if (
            errorMessage.includes("Already Pending") ||
            errorMessage.includes("already pending")
          ) {
            toast.add({
              type: "warning",
              title: "Payment Already Pending",
              description:
                "You already have a pending payment. Please check your bKash app or contact support.",
            });
          } else {
            toast.add({
              type: "error",
              title: "Payment Retry Failed",
              description: errorMessage,
            });
          }
        },
      },
    );
  };

  const canRetry =
    payment &&
    trip?.status === "COMPLETED" &&
    trip.fare &&
    (payment.status === "FAILED" ||
      payment.status === "CANCELLED" ||
      payment.status === "UNPAID");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-4">
            <span>Payment Details</span>
            {payment && <PaymentStatusBadge status={payment.status} />}
          </DialogTitle>
          <DialogDescription>
            {payment
              ? `Payment created ${formatDistanceToNow(
                  new Date(payment.paymentCreateTime || payment.createdAt),
                  { addSuffix: true },
                )}`
              : "Loading details..."}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <p className="py-6 text-center text-sm text-destructive">
            {(error as Error)?.message || "Failed to load payment details."}
          </p>
        )}

        {payment && (
          <div className="space-y-4 py-2">
            {/* Amount */}
            <Section title="Payment Amount">
              <p className="text-2xl font-bold">
                ৳{Number(payment.amount).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {payment.currency}
              </p>
            </Section>

            {/* Payment Information */}
            <Section title="Payment Information">
              <Row label="Transaction ID" value={payment.trxID || "N/A"} />
              <Row
                label="Payment Gateway"
                value={
                  <span className="capitalize">{payment.paymentGateway}</span>
                }
              />
              {payment.bkashPaymentID && (
                <Row
                  label="bKash Payment ID"
                  value={
                    <span className="text-xs break-all">
                      {payment.bkashPaymentID}
                    </span>
                  }
                />
              )}
              {payment.merchantInvoiceNumber && (
                <Row
                  label="Invoice Number"
                  value={
                    <span className="text-xs break-all">
                      {payment.merchantInvoiceNumber}
                    </span>
                  }
                />
              )}
              {payment.payerReference && (
                <Row label="Payer Reference" value={payment.payerReference} />
              )}
              <Row
                label="Created"
                value={fmt(payment.paymentCreateTime || payment.createdAt)}
              />
              {payment.paymentExecuteTime && (
                <Row label="Executed" value={fmt(payment.paymentExecuteTime)} />
              )}
            </Section>

            {payment.failureReason && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm font-medium text-red-900">
                  Failure Reason
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {payment.failureReason}
                </p>
              </div>
            )}

            {/* Trip Information */}
            {trip && (
              <>
                <Section title="Trip Information">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Trip Status
                    </span>
                    <Badge variant="outline">
                      {TRIP_STATUS_CONFIG[
                        trip.status as keyof typeof TRIP_STATUS_CONFIG
                      ]?.label || trip.status}
                    </Badge>
                  </div>
                  <Row
                    label="Trip ID"
                    value={
                      <span className="text-xs break-all">
                        {trip.id.slice(0, 13)}...
                      </span>
                    }
                  />
                  {trip.distanceKm && (
                    <Row
                      label="Distance"
                      value={`${trip.distanceKm.toFixed(2)} km`}
                    />
                  )}
                  {trip.fare && (
                    <Row
                      label="Fare"
                      value={`৳${Number(trip.fare).toLocaleString()}`}
                    />
                  )}
                </Section>

                {/* Trip Timeline */}
                <Section title="Trip Timeline">
                  <TripTimeline trip={trip} />
                </Section>

                {/* Additional IDs */}
                <Section title="Reference IDs">
                  <Row
                    label="Emergency ID"
                    value={
                      <span className="font-mono text-xs">
                        {trip.emergencyId.slice(0, 13)}...
                      </span>
                    }
                  />
                  <Row
                    label="Dispatch ID"
                    value={
                      <span className="font-mono text-xs">
                        {trip.dispatchId.slice(0, 13)}...
                      </span>
                    }
                  />
                  {trip.hospitalId && (
                    <Row
                      label="Hospital ID"
                      value={
                        <span className="font-mono text-xs">
                          {trip.hospitalId.slice(0, 13)}...
                        </span>
                      }
                    />
                  )}
                </Section>
              </>
            )}

            {/* Actions */}
            <div className="space-y-2">
              {canRetry && (
                <Button
                  className="w-full"
                  onClick={handleRetryPayment}
                  disabled={isRetrying}
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Retry Payment"
                  )}
                </Button>
              )}

              {payment?.status === "PENDING" && (
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-500">
                    ⚠️ Payment Pending
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please complete your pending payment from your bKash app.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
