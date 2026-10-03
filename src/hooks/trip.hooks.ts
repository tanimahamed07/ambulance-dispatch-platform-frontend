import {
  getMyTrips,
  getMyTripsDetails,
  markTripEnRoute,
  markTripPickedUp,
  selectHospital,
  markHospitalArrival,
  completeTrip,
  calculateTripFare,
} from "@/api/trip.api";
import { IQuery } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetMyTrips(params: IQuery) {
  return useQuery({
    queryKey: ["my-trips", params],
    queryFn: () => getMyTrips(params),
  });
}

export function useGetMyTripDetails(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ["trip-details", id],
    queryFn: () => getMyTripsDetails(id as string),
    enabled: enabled && !!id,
  });
}

export function useMarkTripEnRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markTripEnRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-details"] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
  });
}

export function useMarkTripPickedUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markTripPickedUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-details"] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
  });
}

export function useSelectHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tripId,
      hospitalId,
    }: {
      tripId: string;
      hospitalId: string;
    }) => selectHospital(tripId, { hospitalId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-details"] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
  });
}

export function useMarkHospitalArrival() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markHospitalArrival,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-details"] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
  });
}

export function useCompleteTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tripId,
      distanceKm,
    }: {
      tripId: string;
      distanceKm: number;
    }) => completeTrip(tripId, { distanceKm }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-details"] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
  });
}

export function useCalculateTripFare(
  tripId: string | null,
  distanceKm: number,
  enabled = false,
) {
  return useQuery({
    queryKey: ["calculate-fare", tripId, distanceKm],
    queryFn: () => calculateTripFare(tripId as string, distanceKm),
    enabled: enabled && !!tripId && distanceKm > 0,
  });
}
