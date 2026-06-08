import { pool } from "../db";


export const logActivity = async ({
  user_id,
  action,
  entity_type,
  entity_id,
}: {
  user_id?: number;
  action: string;
  entity_type: "project" | "task" | "user";
  entity_id: number;
}) => {
  await pool.query(
    `INSERT INTO activity_logs
    (user_id, action, entity_type, entity_id)
    VALUES ($1,$2,$3,$4)`,
    [user_id || null, action, entity_type, entity_id]
  );
};