"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateHospitalForm from "@/components/form/create-hospital-form";

interface CreateHospitalModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateHospitalModal({
  isOpen,
  onOpenChange,
}: CreateHospitalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Hospital</DialogTitle>
          <DialogDescription>
            Register a new hospital in the system. Fill in the required details
            below.
          </DialogDescription>
        </DialogHeader>

        <CreateHospitalForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
