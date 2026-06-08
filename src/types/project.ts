export type ProjectStatus = "active" | "completed" | "on_hold";

export interface IProject {
  id?: number;
  name: string;
  description?: string;
  deadline: string;
  status?: ProjectStatus;
  created_by?: number;
}

export type IdParams = {
  id: string;
};

export type ProjectMemberParams = {
  projectId: string;
  userId: string;
};