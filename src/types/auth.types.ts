export interface CallerRegistrationPayload {
  name: string;
  email: string;
  password: string;
  caller?: {
    contactNumber?: string;
  };
}


export interface VerifyAccountPayload {
  email: string,
  otp: string,
}