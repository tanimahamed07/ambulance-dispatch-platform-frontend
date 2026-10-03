import {
  createHospital,
  deleteHospital,
  getHospitalById,
  getHospitals,
  updateHospital,
  updateHospitalStatus,
} from "@/api/hospital.api";
import type {
  CreateHospitalPayload,
  HospitalQueryParams,
} from "@/types/hospital.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetHospitals(params: HospitalQueryParams) {
  return useQuery({
    queryKey: ["hospitals", params],
    queryFn: () => getHospitals(params),
  });
}

export function useGetHospitalById(id: string | null) {
  return useQuery({
    queryKey: ["hospital", id],
    queryFn: () => getHospitalById(id as string),
    enabled: !!id,
  });
}

export function useCreateHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHospital,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useUpdateHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<CreateHospitalPayload>;
    }) => updateHospital(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["hospital"] });
    },
  });
}

export function useDeleteHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHospital,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useUpdateHospitalStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "ACTIVE" | "INACTIVE";
    }) => updateHospitalStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["hospital"] });
    },
  });
}
