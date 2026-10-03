import apiClient from "@/lib/apiClient";
import { ApiResponse, IQuery, PaginatedResponse } from "@/types";
import { MyTrip, TripDetails } from "@/types/trip.type";

export function getMyTrips(params?: IQuery) {
  return apiClient<ApiResponse<PaginatedResponse<MyTrip>>>("/trip/my-trips", {
    params,
  });
}

export function getMyTripsDetails(id: string) {
  return apiClient<ApiResponse<TripDetails>>(`/trip/${id}`);
}

export function markTripEnRoute(tripId: string) {
  return apiClient<ApiResponse<TripDetails>>(`/trip/${tripId}/en-route`, {
    method: "PATCH",
  });
}

export function markTripPickedUp(tripId: string) {
  return apiClient<ApiResponse<TripDetails>>(`/trip/${tripId}/pickup`, {
    method: "PATCH",
  });
}
