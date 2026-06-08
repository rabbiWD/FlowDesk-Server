
export const UserRole ={
    admin: "admin",
    project_manager: "project_manager",
    member: "member",
} as const;

export type Roles = "admin" | "project_manager" | "member";

export interface IUser{
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: Roles;
    created_at?: Date;
    updated_at?: Date;
}