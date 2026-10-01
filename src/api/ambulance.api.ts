import apiClient from "@/lib/apiClient";
import type {
  Ambulance,
  AmbulanceDetails,
  AmbulanceQueryParams,
  CreateAmbulancePayload,
} from "@/types/ambulence.type";
import type { ApiResponse, AssignDriverPayload, PaginatedResponse } from "@/types";

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

export function getAmbulanceDetails(id: string) {
  return apiClient<ApiResponse<AmbulanceDetails>>(`/ambulance/${id}`);
}


export function assignDriverWithAmbulance(id: string, payload: AssignDriverPayload) {
  return apiClient<ApiResponse<Ambulance>>(`/ambulance/${id}/assign-driver`, {
    method: "PATCH",
    body: payload,
  });
}

