export type EmergencyType =
  | "ACCIDENT"
  | "CARDIAC"
  | "PREGNANCY"
  | "STROKE"
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
  | "DISPATCHED"
  | "EN_ROUTE"
  | "PICKED_UP"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type DispatchStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
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

export type TripStatus =
  | "DISPATCHED"
  | "EN_ROUTE"
  | "PICKED_UP"
  | "AT_HOSPITAL"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

// ... EmergencyPayload, Emergency, EmergencyQueryParams আগের মতোই থাকবে

export interface EmergencyPayment {
  id: string;
  status: PaymentStatus;
  amount: string;
  currency: string;
  trxID: string | null;
  paymentExecuteTime: string | null;
  failureReason: string | null;
}

export interface EmergencyHospital {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface EmergencyTrip {
  id: string;
  status: TripStatus;
  startedAt: string | null;
  pickedUpAt: string | null;
  hospitalArrivalAt: string | null;
  completedAt: string | null;
  distanceKm: number | null;
  fare: string | null;
  hospital: EmergencyHospital | null;
  payment?: EmergencyPayment | null; // driver পাবে না
}

export interface EmergencyDispatch {
  id: string;
  status: DispatchStatus;
  dispatchedAt: string | null;
  acceptedAt: string | null;
  ambulance: {
    id: string;
    ambulanceNumber: string;
    vehicleType: string;
    model: string;
    status: string;
    registrationNumber?: string; // staff only
  };
  driver: {
    id: string;
    contactNumber: string;
    address?: string; // staff only
    isAvailable?: boolean; // staff only
    user: { name: string; profileUrl: string | null; email?: string };
  };
  trips: EmergencyTrip | null;
}

export interface EmergencyCaller {
  id: string;
  contactNumber: string | null;
  bloodGroup: string | null;
  gender: string | null;
  address: string | null;
  user: { name: string; email: string; profileUrl: string | null };
}

export interface EmergencyDetails extends Emergency {
  description: string | null;
  pickupLatitude: number;
  pickupLongitude: number;
  cancellationReason: string | null;
  cancelledAt: string | null;
  caller?: EmergencyCaller; // staff only
  dispatch: EmergencyDispatch | null;
}

export interface CreateDispatchPayload {
  emergencyId: string;
  driverId: string;
}
