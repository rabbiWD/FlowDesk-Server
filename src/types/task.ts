export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "high" | "medium" | "low";

export interface ITask {
  id?: number;
  title: string;
  description?: string;
  project_id: number;
  assigned_to?: number;
  priority: TaskPriority;
  status?: TaskStatus;
  due_date: string;
  created_by?: string;
}

export type TaskParams = {
  id: string;
};

export type TaskStatusParams = {
  id: string;
};

export type TaskQuery = {
  status?: string;
  priority?: string;
  projectId?: string;
};