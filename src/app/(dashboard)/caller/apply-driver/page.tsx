import { Car, ShieldCheck, Clock3, AlertCircle } from "lucide-react";
import ApplyDriverForm from "@/components/form/apply-driver-form";

export default function ApplyDriverPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <Car className="h-5 w-5" />
          </div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Apply as a Driver
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Join our team of lifesaving drivers. Fill in your details to start
          your driver application.
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <AlertCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-primary">
            Important Information
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            All applications are reviewed within 24-48 hours. You will be
            notified via email once your application is processed.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Car className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium">Flexible Schedule</p>
            <p className="text-xs text-muted-foreground">
              Work on your own schedule
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium">Verified & Safe</p>
            <p className="text-xs text-muted-foreground">
              Thorough verification process
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Clock3 className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium">Quick Approval</p>
            <p className="text-xs text-muted-foreground">Fast review process</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <ApplyDriverForm />
      </div>
    </div>
  );
}
