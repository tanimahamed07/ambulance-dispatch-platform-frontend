import {
  ambulanceRequest,
  createDispatch,
  getEmergenciesRequest,
  getEmergencyDetails,
  getMyEmergencies,
} from "@/api";
import type { EmergencyQueryParams } from "@/types/emergency.type";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useAmbulanceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ambulanceRequest,
    onSuccess: () => {
      // Invalidate all related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["my-emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["caller-dashboard"] });
    },
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

export function useCreateDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDispatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["emergency-details"] });
    },
  });
}
