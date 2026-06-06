import type { UserRole } from "./user";

export interface IJWT {
  id: number;
  email: string;
  role: UserRole;
}