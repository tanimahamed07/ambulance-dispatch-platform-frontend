export type UserRole = "ADMIN" | "DISPATCHER" | "DRIVER" | "CALLER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type AuthProvider = "CREDENTIAL" | "GOOGLE";
export type BloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface CallerProfile {
  id: string;
  contactNumber: string | null;
  dateOfBirth: string | null;
  bloodGroup: BloodGroup | null;
  gender: Gender | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface DriverProfile {
  id: string;
  contactNumber: string | null;
  dateOfBirth: string | null;
  bloodGroup: BloodGroup | null;
  gender: Gender | null;
  address: string | null;
  licenseNumber: string | null;
  licenseExpiry: string | null;
  emergencyContact: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  googleId: string | null;
  authProvider: AuthProvider;
  profileUrl: string;
  profilePublicId: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  caller?: CallerProfile;
  driver?: DriverProfile;
}
