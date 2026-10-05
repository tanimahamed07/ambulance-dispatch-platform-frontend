import apiClient from "@/lib/apiClient";
import type { AdminDashboardAnalytics } from "@/types";

export function getAdminDashboard() {
  return apiClient<{ data: AdminDashboardAnalytics }>("/analytics/admin");
}
