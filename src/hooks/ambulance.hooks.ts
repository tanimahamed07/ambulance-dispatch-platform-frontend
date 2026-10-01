import { getAllAmbulance } from "@/api/ambulance.api";
import type { AmbulanceQueryParams } from "@/types/ambulence.type";
import { useQuery } from "@tanstack/react-query";

export function useGetAllAmbulance(params?: AmbulanceQueryParams) {
  return useQuery({
    queryKey: ["ambulances", params],
    queryFn: () => getAllAmbulance(params),
  });
}
