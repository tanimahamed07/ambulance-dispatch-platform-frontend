export interface CallerRegistrationPayload {
  name: string;
  email: string;
  password: string;
  caller?: {
    contactNumber?: string;
  };
}
