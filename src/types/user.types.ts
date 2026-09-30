export type UserRole = "ADMIN" | "DISPATCHER" | "DRIVER" | "CALLER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
