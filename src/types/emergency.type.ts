export type EmergencyType =
  | "ACCIDENT"
  | "CARDIAC"
  | "PREGNANCY"
  | "TRAUMA"
  | "BREATHING_PROBLEM"
  | "OTHER";

export interface EmergencyPayload {
  patientName: string;
  patientPhone: string;
  emergencyType: EmergencyType;
  description?: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
}

export type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type EmergencyStatus =
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type DispatchStatus =
  | "PENDING"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "ARRIVED"
  | "COMPLETED"
  | "CANCELLED";

  
export interface Emergency {
  id: string;
  patientName: string;
  patientPhone: string;
  pickupAddress: string;
  emergencyType: EmergencyType;
  priority: Priority;
  status: EmergencyStatus;
  createdAt: string;
  dispatch: {
    status: DispatchStatus;
    ambulance: { ambulanceNumber: string };
    driver: { user: { name: string } };
  } | null;
}

export interface EmergencyQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  emergencyType?: EmergencyType;
  status?: EmergencyStatus;
  priority?: Priority;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
