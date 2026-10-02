import {
  getDispatchDetails,
  getMyDispatch,
  acceptDispatch,
  rejectDispatch,
} from "@/api/dispatch.api";
import { MyDispatchParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetMyDispatches(params: MyDispatchParams) {
  return useQuery({
    queryKey: ["my-dispatches", params],
    queryFn: () => getMyDispatch(params),
  });
}

export function useGetDispatchDetails(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ["dispatch-details", id],
    queryFn: () => getDispatchDetails(id as string),
    enabled: !!id && enabled,
  });
}

export function useAcceptDispatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => acceptDispatch(id),
    onSuccess: (data, variables) => {
      // Refetch dispatch list
      queryClient.invalidateQueries({ queryKey: ["my-dispatches"] });
      // Refetch dispatch details
      queryClient.invalidateQueries({
        queryKey: ["dispatch-details", variables],
      });
    },
  });
}

export function useRejectDispatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rejectDispatch(id),
    onSuccess: (data, variables) => {
      // Refetch dispatch list
      queryClient.invalidateQueries({ queryKey: ["my-dispatches"] });
      // Refetch dispatch details
      queryClient.invalidateQueries({
        queryKey: ["dispatch-details", variables],
      });
    },
  });
}
