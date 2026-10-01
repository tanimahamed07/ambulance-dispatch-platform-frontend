import apiClient from "@/lib/apiClient";
import type { Ambulance, AmbulanceQueryParams } from "@/types/ambulence.type";
import type { ApiResponse, PaginatedResponse } from "@/types";

export function getAllAmbulance(params?: AmbulanceQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Ambulance>>>(
    "/ambulance/all-ambulance",
    {
      params,
    },
  );
}
