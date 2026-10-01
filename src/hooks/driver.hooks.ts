import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDrivers, assignDriver, applyDriver } from "@/api/driver.api";
import type {
  DriverQueryParams,
  AssignDriverPayload,
} from "@/types/driver.type";
import { toast } from "@/components/ui/toast";

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
      toast.create({
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
      toast.create({
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
