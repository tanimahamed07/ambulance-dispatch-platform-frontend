import { callerRegistration } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useRegistration() {
  return useMutation({
    mutationFn: callerRegistration,
  });
}
