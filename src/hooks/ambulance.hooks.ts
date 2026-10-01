import { createAmbulance, getAllAmbulance } from "@/api/ambulance.api";
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
