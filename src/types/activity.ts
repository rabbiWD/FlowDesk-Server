
export interface IActivity {
  id?: number;
  user_id: number;
  action: string;
  entity_type?: "project" | "task" | "user";
  entity_id?: number;
  created_at?: Date;
}