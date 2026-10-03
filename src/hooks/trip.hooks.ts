import {
  getMyTrips,
  getMyTripsDetails,
  markTripEnRoute,
  markTripPickedUp,
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
