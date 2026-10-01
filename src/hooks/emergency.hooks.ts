import {
  ambulanceRequest,
  getEmergenciesRequest,
  getEmergencyDetails,
  getMyEmergencies,
} from "@/api";
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
export function useGetEmergenciesRequest(params?: EmergencyQueryParams) {
  return useQuery({
    queryKey: ["emergencies", params], // "my-emergencies" থেকে আলাদা
    queryFn: () => getEmergenciesRequest(params),
    placeholderData: keepPreviousData,
  });
}

export function useGetEmergencyDetails(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ["emergency-details", id],
    queryFn: () => getEmergencyDetails(id as string),
    enabled: enabled && !!id,
  });
}
