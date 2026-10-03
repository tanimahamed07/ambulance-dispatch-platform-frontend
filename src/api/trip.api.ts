import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  IQuery,
  MyTrip,
  PaginatedResponse,
  TripDetails,
} from "@/types";

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

export function selectHospital(
  tripId: string,
  payload: { hospitalId: string },
) {
  return apiClient<ApiResponse<TripDetails>>(
    `/trip/${tripId}/select-hospital`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function markHospitalArrival(tripId: string) {
  return apiClient<ApiResponse<TripDetails>>(
    `/trip/${tripId}/hospital-arrival`,
    {
      method: "PATCH",
    },
  );
}

export function completeTrip(tripId: string, payload: { distanceKm: number }) {
  return apiClient<ApiResponse<TripDetails>>(`/trip/${tripId}/complete`, {
    method: "PATCH",
    body: payload,
  });
}

export function calculateTripFare(tripId: string, distanceKm: number) {
  return apiClient<
    ApiResponse<{
      distanceKm: number;
      priority: string;
      baseFare: number;
      perKmRate: number;
      calculatedFare: number;
    }>
  >(`/trip/${tripId}/calculate-fare`, {
    params: { distanceKm },
  });
}
