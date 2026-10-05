import { AmbulanceStatus, AmbulanceType } from "./ambulence.type";
import {
  DispatchStatus,
  EmergencyStatus,
  EmergencyType,
  Priority,
} from "./emergency.type";

// Existing Dispatch Types

export interface MyDispatch {
  id: string;
  status: DispatchStatus;
  dispatchedAt: Date | string | null;
  acceptedAt: Date | string | null;
  emergency: {
    id: string;
    patientName: string;
    patientPhone: string;
    emergencyType: EmergencyType;
    priority: Priority;
    status: EmergencyStatus;
    pickupAddress: string;
    destination?: string;
    description?: string;
    createdAt?: Date | string;
  };
}

export interface MyDispatchParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: DispatchStatus;
  emergencyType?: EmergencyType;
  priority?: Priority;
  searchTerm?: string;
}

export interface MyDispatchResponse {
  id: string;
  status: DispatchStatus;
  dispatchedAt: Date | string | null;
  acceptedAt: Date | string | null;

  emergency: {
    id: string;
    patientName: string;
    patientPhone: string;
    emergencyType: EmergencyType;
    description: string | null;
    priority: Priority;
    status: EmergencyStatus;
    pickupAddress: string;
  };

  ambulance: {
    id: string;
    ambulanceNumber: string;
    vehicleType: AmbulanceType;
    status: AmbulanceStatus;
  };
}

export interface DispatchUserProfile {
  name: string;
  email: string;
  profileUrl?: string | null;
}

export interface Caller {
  id?: string;
  user: DispatchUserProfile;
}

export interface EmergencyDetail {
  id: string;
  patientName: string;
  patientPhone: string;
  emergencyType: EmergencyType;
  priority: Priority;
  status: EmergencyStatus;
  pickupAddress: string;
  destination?: string | null;
  description?: string | null;
  createdAt?: Date | string;
  caller: Caller;
}

export interface DriverDetail {
  id: string;
  user: DispatchUserProfile;
}

export interface AmbulanceDetail {
  id: string;
  ambulanceNumber: string;
  vehicleType: AmbulanceType;
  status: AmbulanceStatus;
}

export interface DispatchDetailResponse {
  id: string;
  emergencyId: string;
  driverId: string;
  ambulanceId: string;
  status: DispatchStatus;
  dispatchedAt: Date | string | null;
  acceptedAt?: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  emergency: EmergencyDetail;
  driver: DriverDetail;
  ambulance: AmbulanceDetail;
}
