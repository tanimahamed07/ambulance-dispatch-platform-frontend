import apiClient from "@/lib/apiClient";
import type {
  AdminDashboardAnalytics,
  DispatcherDashboardAnalytics,
  DriverDashboardAnalytics,
} from "@/types";

export function getAdminDashboard() {
  return apiClient<{ data: AdminDashboardAnalytics }>("/analytics/admin");
}

export function getDispatcherDashboard() {
  return apiClient<{ data: DispatcherDashboardAnalytics }>(
    "/analytics/dispatcher",
  );
}

export function getDriverDashboard() {
  return apiClient<{ data: DriverDashboardAnalytics }>("/analytics/driver");
}
