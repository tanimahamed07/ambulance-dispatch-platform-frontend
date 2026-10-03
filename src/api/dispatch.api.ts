import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types";
import {
  DispatchDetailResponse,
  MyDispatch,
  MyDispatchParams,
} from "@/types/dispatch.type";

export function getMyDispatch(params?: MyDispatchParams) {
  return apiClient<ApiResponse<PaginatedResponse<MyDispatch>>>(
    "/dispatch/my-dispatches",
    {
      params,
    },
  );
}



export function getDispatchDetails(id: string) {
  return apiClient<ApiResponse<DispatchDetailResponse>>(`/dispatch/${id}`);
}

export function acceptDispatch(id: string) {
  return apiClient<ApiResponse<null>>(`/dispatch/${id}/accept`, {
    method: "PATCH",
  });
}

export function rejectDispatch(id: string) {
  return apiClient<ApiResponse<null>>(`/dispatch/${id}/reject`, {
    method: "PATCH",
  });
}


