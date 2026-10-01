import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api.type";
import {
  Emergency,
  EmergencyDetails,
  EmergencyPayload,
  EmergencyQueryParams,
} from "@/types/emergency.type";

export function ambulanceRequest(payload: EmergencyPayload) {
  return apiClient("/emergency", { method: "POST", body: payload });
}

export function getMyEmergencies(params?: EmergencyQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Emergency>>>(
    "/emergency/my-emergencies",
    {
      params,
    },
  );
}

export function getEmergenciesRequest(params?: EmergencyQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Emergency>>>("/emergency", {
    params,
  });
}

export function getEmergencyDetails(id: string) {
  return apiClient<ApiResponse<EmergencyDetails>>(`/emergency/${id}`);
}
