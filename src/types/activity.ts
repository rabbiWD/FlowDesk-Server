
export interface IActivity {
  id?: number;
  user_id: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  created_at?: Date;
}