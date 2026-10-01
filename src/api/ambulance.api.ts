import apiClient from "@/lib/apiClient";
import type {
  Ambulance,
  AmbulanceQueryParams,
  CreateAmbulancePayload,
} from "@/types/ambulence.type";
import type { ApiResponse, PaginatedResponse } from "@/types";

export function getAllAmbulance(params?: AmbulanceQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Ambulance>>>(
    "/ambulance/all-ambulance",
    {
      params,
    },
  );
}

export function createAmbulance(payload: CreateAmbulancePayload) {
  return apiClient("/ambulance/create-ambulance", {
    method: "POST",
    body: payload,
  });
}
