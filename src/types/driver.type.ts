export type DriverApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";
export type RejectionReason =
  | "INVALID_LICENSE"
  | "EXPIRED_LICENSE"
  | "FAILED_BACKGROUND_CHECK"
  | "INCOMPLETE_DOCUMENTS"
  | "OTHER";

export interface Driver {
  id: string;
  licenseNumber: string;
  licenseUrl: string;
  licensePublicId: string;
  licenseExpiry: string;
  nidNumber: string;
  nidUrl?: string;
  contactNumber: string;
  address: string;
  approvalStatus: DriverApprovalStatus;
  isAvailable: boolean;
  rejectionReason?: RejectionReason | null;
  rejectionNote?: string | null;
  rejectedAt?: string | null;
  approvedAt?: string | null;
  ambulanceId: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    profileUrl: string;
  };
  ambulance?: {
    id: string;
    ambulanceNumber: string;
    vehicleType: string;
    model: string;
    status: string;
  } | null;
}

export interface DriverQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  assignable?: string;
  hasAmbulance?: string;
  email?: string;
  licenseNumber?: string;
  isAvailable?: string | boolean;
  approvalStatus?: DriverApprovalStatus | "ALL";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AssignDriverPayload {
  driverId: string;
}

export interface ApplyDriverPayload {
  contactNumber: string;
  address: string;
  licenseNumber: string;
  licenseUrl: string;
  licensePublicId: string;
  licenseExpiry: Date;
  nidNumber: string;
}

export interface ApproveDriverPayload {
  driverId: string;
  approvalStatus: DriverApprovalStatus;
  rejectionReason?: RejectionReason;
  rejectionNote?: string;
}

export interface AssignDriverToAmbulancePayload {
  driverId: string;
}

export interface DutyStatusResponse {
  id: string;
  contactNumber: string;
  address: string;
  licenseNumber: string;
  licenseUrl: string;
  licensePublicId: string;
  licenseExpiry: Date;
  nidNumber: string;

  approvalStatus: DriverApprovalStatus;
  isAvailable: boolean;

  rejectionReason: string | null;
  rejectionNote: string | null;
  rejectedAt: Date | null; // ISO Date string

  userId: string;
  ambulanceId: string | null;

  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// In src/types/driver.type.ts

export interface DispatchableDriver {
  id: string;
  userId: string;
  contactNumber: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: string; // ISO Date string
  nidNumber: string;
  isAvailable: boolean;
  approvalStatus: DriverApprovalStatus;
  ambulanceId: string | null;
  ambulance?: {
    id: string;
    vehicleNumber: string;
    type: string;
    status: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    profilePicture: string | null;
  };
}

export interface DispatchableDriversQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "licenseNumber" | "contactNumber";
  sortOrder?: "asc" | "desc";
  isAvailable?: boolean;
  ambulanceType?: string; // AC, NON_AC, ICU, etc.
}
