import {
  assignDriverWithAmbulance,
  createAmbulance,
  getAllAmbulance,
  getAmbulanceDetails,
} from "@/api/ambulance.api";
import { AssignDriverPayload } from "@/types";
import type { AmbulanceQueryParams } from "@/types/ambulence.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllAmbulance(params?: AmbulanceQueryParams) {
  return useQuery({
    queryKey: ["ambulances", params],
    queryFn: () => getAllAmbulance(params),
  });
}

export function useCreateAmbulance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAmbulance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulances"] });
    },
  });
}

export function useGetAmbulanceDetails(id: string | null) {
  return useQuery({
    queryKey: ["ambulance-details", id],
    queryFn: () => getAmbulanceDetails(id as string),
    enabled: !!id, // Only fetch when id is provided
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
      payload: AssignDriverPayload;
    }) => assignDriverWithAmbulance(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulances"] });
    },
  });
}
