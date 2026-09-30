import { Ambulance, MapPin, AlertCircle } from "lucide-react";
import AmbulanceRequestForm from "@/components/form/ambulance-request-form";

export default function EmergencyRequestPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <Ambulance className="h-5 w-5" />
          </div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Request Ambulance
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Fill out the form below to request an ambulance. Help will be
          dispatched immediately.
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-destructive">
            Emergency Hotline: 999
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            In case of life-threatening emergency, call 999 immediately while
            submitting this request.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <AmbulanceRequestForm />
      </div>
    </div>
  );
}
