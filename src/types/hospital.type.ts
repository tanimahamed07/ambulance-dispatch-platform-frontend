export type HospitalStatus = "ACTIVE" | "INACTIVE";

export interface Hospital {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  address: string;
  latitude: number;
  longitude: number;
  emergencyAvailable: boolean;
  specialties: string[];
  status: HospitalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHospitalPayload {
  name: string;
  phone: string;
  email?: string;
  address: string;
  latitude: number;
  longitude: number;
  emergencyAvailable?: boolean;
  specialties?: string[];
  status: HospitalStatus;
}

export interface HospitalQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: HospitalStatus;
  emergencyAvailable?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
