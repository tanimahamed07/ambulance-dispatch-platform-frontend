import type { SidebarItems, UserRole } from "@/types";
import { adminRoutes } from "./adminRoutes";
import { callerRoutes } from "./callerRoutes";
import { dispatcherRoutes } from "./dispatcherRoutes";
import { driverRoutes } from "./driverRoutes";

export * from "./adminRoutes";
export * from "./callerRoutes";
export * from "./dispatcherRoutes";
export * from "./driverRoutes";

/** Single source of truth for role-based dashboard navigation. */
export const ROUTES_BY_ROLE: Record<UserRole, SidebarItems> = {
  ADMIN: adminRoutes,
  DISPATCHER: dispatcherRoutes,
  DRIVER: driverRoutes,
  CALLER: callerRoutes,
};

/**
 * Resolve the nav for a role coming from the API. Tolerates an unknown or
 * missing role so a new backend role can never crash the sidebar.
 */
export function getRoutesForRole(role?: string): SidebarItems {
  if (!role) {
    return [];
  }

  return ROUTES_BY_ROLE[role as UserRole] ?? [];
}
