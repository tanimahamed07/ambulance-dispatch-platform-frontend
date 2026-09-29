// lib/get-error-message.ts
import { FetchError } from "ofetch";

export function getErrorMessage(err: unknown): string {
  if (err instanceof FetchError) {
    return err.data?.message ?? err.message;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again";
}