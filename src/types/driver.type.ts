export interface Driver {
  id: string;
  licenseNumber: string;
  nidNumber: string;
  contactNumber: string;
  address: string;
  isAvailable: boolean;
  ambulanceId: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    profileUrl: string | null;
  };
  ambulance?: {
    id: string;
    ambulanceNumber: string;
    vehicleType: string;
    model: string;
    status: string;
  };
}

export interface DriverQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  assignable?: string;
  email?: string;
  licenseNumber?: string;
  isAvailable?: string | boolean;
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