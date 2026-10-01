import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllDrivers,
  assignDriver,
  applyDriver,
  getAllDriverApplication,
  getDriverDetails,
  updateDriverApplicationStatus,
  assignDriverToAmbulance,
} from "@/api/driver.api";
import type {
  DriverQueryParams,
  AssignDriverPayload,
  ApproveDriverPayload,
} from "@/types/driver.type";
import { toast } from "@/components/ui/toast";
import {
  assignDriverWithAmbulance,
  unassignDriverWithAmbulance,
} from "@/api/ambulance.api";

export function useGetAllDrivers(params?: DriverQueryParams) {
  return useQuery({
    queryKey: ["drivers", params],
    queryFn: () => getAllDrivers(params),
  });
}

export function useAssignDriver(emergencyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignDriverPayload) =>
      assignDriver(emergencyId, payload),
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Success",
        description: "Driver assigned successfully",
      });
      // Refetch emergency details
      queryClient.invalidateQueries({
        queryKey: ["emergency-details", emergencyId],
      });
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
    },
    onError: (error: any) => {
      toast.add({
        type: "error",
        title: "Error",
        description: error?.message || "Failed to assign driver",
      });
    },
  });
}

export function useApplyDriver() {
  return useMutation({
    mutationFn: applyDriver,
  });
}

export function useGetAllDriverApplication(params?: DriverQueryParams) {
  return useQuery({
    queryKey: ["driver-applications", params],
    queryFn: () => getAllDriverApplication(params),
  });
}

export function useGetDriverDetails(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ["driver-details", id],
    queryFn: () => getDriverDetails(id as string),
    enabled: !!id && enabled,
  });
}

export function useDriverApplicationStatusUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApproveDriverPayload) =>
      updateDriverApplicationStatus(payload),
    onSuccess: (data, variables) => {
      const action =
        variables.approvalStatus === "APPROVED" ? "approved" : "rejected";
      toast.add({
        type: "success",
        title: "Success",
        description: `Driver application ${action} successfully`,
      });
      // Refetch driver applications list
      queryClient.invalidateQueries({ queryKey: ["driver-applications"] });
      // Refetch driver details
      queryClient.invalidateQueries({
        queryKey: ["driver-details", variables.driverId],
      });
    },
    onError: (error: any) => {
      toast.add({
        type: "error",
        title: "Error",
        description:
          error?.message || "Failed to update driver application status",
      });
    },
  });
}

export function useAssignDriverWithAmbulance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { driverId: string };
    }) => assignDriverWithAmbulance(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulances"] });
    },
  });
}

export function useUnAssignDriverWithAmbulance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { driverId: string };
    }) => unassignDriverWithAmbulance(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulances"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}
