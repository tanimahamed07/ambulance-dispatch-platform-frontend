"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, Eye, Receipt } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Payment } from "@/api/payment.api";
import PaymentDetailsModal from "./payment-details-modal";

const STATUS_CONFIG = {
  COMPLETED: {
    label: "Completed",
    variant: "default" as const,
    className: "bg-green-50 text-green-700 border-green-200",
  },
  PENDING: {
    label: "Pending",
    variant: "secondary" as const,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  UNPAID: {
    label: "Unpaid",
    variant: "outline" as const,
    className: "bg-gray-50 text-gray-700 border-gray-200",
  },
  FAILED: {
    label: "Failed",
    variant: "destructive" as const,
    className: "bg-red-50 text-red-700 border-red-200",
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "outline" as const,
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
} as const;

function PaymentStatusBadge({ status }: { status: Payment["status"] }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center">
      <Receipt className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold">No payments found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        You haven't made any payments yet.
      </p>
    </div>
  );
}

export default function PaymentsTable({
  payments,
}: {
  payments: Payment[];
}) {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDetails = (payment: Payment) => {
    setSelectedTripId(payment.tripId);
    setIsOpen(true);
  };

  if (payments.length === 0) return <EmptyState />;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => {
              return (
                <TableRow key={payment.id}>
                  <TableCell>
                    <p className="font-medium font-mono text-sm">
                      {payment.trxID ||
                        payment.bkashPaymentID?.slice(0, 12) ||
                        payment.id.slice(0, 8)}
                    </p>
                    {payment.payerReference && (
                      <p className="text-xs text-muted-foreground">
                        {payment.payerReference}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <p className="font-semibold">
                      ৳{Number(payment.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.currency}
                    </p>
                  </TableCell>

                  <TableCell>
                    <span className="capitalize font-medium">
                      {payment.paymentGateway}
                    </span>
                  </TableCell>

                  <TableCell>
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {payment.paymentCreateTime
                      ? formatDistanceToNow(new Date(payment.paymentCreateTime), {
                          addSuffix: true,
                        })
                      : formatDistanceToNow(new Date(payment.createdAt), {
                          addSuffix: true,
                        })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDetails(payment)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Payment Detail Modal */}
      <PaymentDetailsModal
        tripId={selectedTripId}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
