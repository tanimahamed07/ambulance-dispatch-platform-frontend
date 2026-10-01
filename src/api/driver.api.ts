import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api.type";
import type {
  Driver,
  DriverQueryParams,
  AssignDriverPayload,
  ApplyDriverPayload,
} from "@/types/driver.type";

export function getAllDrivers(params?: DriverQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Driver>>>(
    "/driver/all-driver",
    {
      params,
    },
  );
}

export function applyDriver(payload: ApplyDriverPayload) {
  return apiClient("/driver/apply-as-driver", {
    method: "POST",
    body: payload,
  });
}

export function assignDriver(
  emergencyId: string,
  payload: AssignDriverPayload,
) {
  return apiClient(`/emergency/${emergencyId}/dispatch`, {
    method: "POST",
    body: payload,
  });
}
