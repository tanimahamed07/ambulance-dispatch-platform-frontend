export interface CallerRegistrationPayload {
  name: string;
  email: string;
  password: string;
  caller?: {
    contactNumber?: string;
  };
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface forgotPasswordPayload {
  email: string;
}

export interface resetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
