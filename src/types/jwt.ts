import type { Roles } from "./user";

export interface IJwtPayload {
  id: number;
  email: string;
  role: Roles;
}