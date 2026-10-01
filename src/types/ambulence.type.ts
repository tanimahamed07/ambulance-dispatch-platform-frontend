export type AmbulanceType = "AC" | "NON_AC" | "ICU" | "FREEZER" | "AIR";

export type AmbulanceStatus =
  | "AVAILABLE"
  | "ASSIGNED"
  | "EN_ROUTE"
  | "OFFLINE"
  | "ON_TRIP"
  | "MAINTENANCE";

export interface Driver {
  id: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  licenseNumber: string;
}

export interface Ambulance {
  id: string;
  ambulanceNumber: string;
  registrationNumber: string;
  registrationExpiry: string;
  vehicleType: AmbulanceType;
  model: string;
  capacity: number;
  status: AmbulanceStatus;
  currentLatitude: number | null;
  currentLongitude: number | null;
  driver: Driver | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AmbulanceQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  vehicleType?: AmbulanceType;
  status?: AmbulanceStatus;
  driverAssignment?: "ASSIGNED" | "UNASSIGNED" | "ALL";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateAmbulancePayload {
  ambulanceNumber: string;
  registrationNumber: string;
  registrationExpiry: string;
  vehicleType: AmbulanceType;
  model: string;
  capacity: number;
}
