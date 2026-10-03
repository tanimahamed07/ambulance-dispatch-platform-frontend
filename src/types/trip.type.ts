import {
  EmergencyStatus,
  EmergencyType,
  Priority,
  TripStatus,
  PaymentStatus,
} from "./emergency.type";

export interface MyTrip {
  id: string;
  status: TripStatus;
  createdAt: string;
  emergency: {
    id: string;
    patientName: string;
    patientPhone: string;
    emergencyType: EmergencyType;
    priority: Priority;
    status: EmergencyStatus;
    pickupAddress: string;
  };
}

export interface TripHospital {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface TripPayment {
  id: string;
  status: PaymentStatus;
  amount: string;
  currency: string;
  trxID: string | null;
  paymentExecuteTime: string | null;
  failureReason: string | null;
}

export interface TripCaller {
  id: string;
  contactNumber: string | null;
  bloodGroup: string | null;
  gender: string | null;
  address: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    profileUrl: string | null;
  };
}

export interface TripEmergency {
  id: string;
  patientName: string;
  patientPhone: string;
  emergencyType: EmergencyType;
  priority: Priority;
  status: EmergencyStatus;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  description: string | null;
  caller: TripCaller;
}

export interface TripDetails {
  id: string;
  status: TripStatus;
  startedAt: string | null;
  pickedUpAt: string | null;
  hospitalArrivalAt: string | null;
  completedAt: string | null;
  distanceKm: number | null;
  fare: string | null;
  createdAt: string;
  updatedAt: string;
  emergency: TripEmergency;
  hospital: TripHospital | null;
  payment?: TripPayment | null;
}
