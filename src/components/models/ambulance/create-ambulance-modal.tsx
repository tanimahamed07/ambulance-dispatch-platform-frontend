"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateAmbulanceForm from "@/components/form/create-ambulance-form";

interface CreateAmbulanceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAmbulanceModal({
  isOpen,
  onOpenChange,
}: CreateAmbulanceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Ambulance</DialogTitle>
          <DialogDescription>
            Fill in the details to register a new ambulance in the system.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <CreateAmbulanceForm onSuccess={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
