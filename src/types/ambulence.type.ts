export type AmbulanceType = "AC" | "NON_AC" | "ICU";

export type AmbulanceStatus =
  | "AVAILABLE"
  | "ASSIGNED"
  | "EN_ROUTE"
  | "OFFLINE"
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
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
