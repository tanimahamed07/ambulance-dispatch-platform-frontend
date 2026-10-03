import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  CreateHospitalPayload,
  Hospital,
  HospitalQueryParams,
  PaginatedResponse,
} from "@/types";

export function createHospital(payload: CreateHospitalPayload) {
  return apiClient<ApiResponse<Hospital>>("/hospital", {
    method: "POST",
    body: payload,
  });
}

export function getHospitals(params?: HospitalQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Hospital>>>("/hospital", {
    params,
  });
}

export function getHospitalById(id: string) {
  return apiClient<ApiResponse<Hospital>>(`/hospital/${id}`);
}

export function updateHospital(
  id: string,
  payload: Partial<CreateHospitalPayload>,
) {
  return apiClient<ApiResponse<Hospital>>(`/hospital/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteHospital(id: string) {
  return apiClient<ApiResponse<void>>(`/hospital/${id}`, {
    method: "DELETE",
  });
}

export function updateHospitalStatus(
  id: string,
  status: "ACTIVE" | "INACTIVE",
) {
  return apiClient<ApiResponse<Hospital>>(`/hospital/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}


