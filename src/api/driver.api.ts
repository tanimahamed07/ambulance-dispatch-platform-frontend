import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api.type";
import type {
  Driver,
  DriverQueryParams,
  AssignDriverPayload,
  ApplyDriverPayload,
  ApproveDriverPayload,
  DutyStatusResponse,
} from "@/types/driver.type";

export function getAllDrivers(params?: DriverQueryParams) {
  return apiClient<ApiResponse<PaginatedResponse<Driver>>>(
    "/driver/all-driver",
    {
      params,
    },
  );
}

export function getAllDriverApplication(params?: DriverQueryParams) {
  // Extract approvalStatus from params to handle it properly
  const { approvalStatus, ...restParams } = params || {};

  return apiClient<ApiResponse<PaginatedResponse<Driver>>>(
    "/driver/applications",
    {
      params: {
        ...restParams,
        // Only include approvalStatus if it's not "ALL"
        ...(approvalStatus && approvalStatus !== "ALL"
          ? { approvalStatus }
          : {}),
      },
    },
  );
}

export function applyDriver(payload: ApplyDriverPayload) {
  return apiClient("/driver/apply-as-driver", {
    method: "POST",
    body: payload,
  });
}

export function getDriverDetails(id: string) {
  return apiClient<ApiResponse<Driver>>(`/driver/applications/${id}`);
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

export function updateDriverApplicationStatus(payload: ApproveDriverPayload) {
  return apiClient<ApiResponse<Driver>>("/driver/approve-driver", {
    method: "PATCH",
    body: payload,
  });
}

export function assignDriverToAmbulance(
  ambulanceId: string,
  payload: { driverId: string },
) {
  return apiClient(`/ambulance/${ambulanceId}/assign-driver`, {
    method: "PATCH",
    body: payload,
  });
}

export function unAssignDriverToAmbulance(
  ambulanceId: string,
  payload: { driverId: string },
) {
  return apiClient(`/ambulance/${ambulanceId}/unassign-driver`, {
    method: "PATCH",
    body: payload,
  });
}

export function driverStatusUpdate(isAvailable: boolean) {
  return apiClient("/driver/me/status", {
    method: "PATCH",
    body: {
      isAvailable,
    },
  });
}

export function getDriverProfile() {
  return apiClient<{ data: DutyStatusResponse }>("/driver/me/profile");
}


