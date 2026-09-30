import { ambulanceRequest, getMyEmergencies } from "@/api";
import type { EmergencyQueryParams } from "@/types/emergency.type";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export function useAmbulanceRequest() {
  return useMutation({
    mutationFn: ambulanceRequest,
  });
}

// export function useGetMyEmergencies(params?: EmergencyQueryParams) {
//   return useQuery({
//     queryKey: ["my-emergencies", params],
//     queryFn: () => getMyEmergencies(params),
//   });
// }

export function useGetMyEmergencies(params?: EmergencyQueryParams) {
  return useQuery({
    queryKey: ["my-emergencies", params],
    queryFn: () => getMyEmergencies(params),
    placeholderData: keepPreviousData,
  });
}
