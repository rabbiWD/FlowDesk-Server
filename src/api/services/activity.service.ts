import { pool } from "../../db";
import type { IActivity } from "../../types/activity";



export const createActivity = async (
  payload: IActivity
) => {
  const result = await pool.query(
    `INSERT INTO activity_logs
    (user_id, action, entity_type, entity_id)
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
    [
      payload.user_id || null,
      payload.action,
      payload.entity_type,
      payload.entity_id,
    ]
  );

  return result.rows[0];
};


export const getActivities = async () => {
  const result = await pool.query(`
    SELECT 
      al.*,
      u.name as user_name,
      u.email as user_email
    FROM activity_logs al
    LEFT JOIN users u ON u.id = al.user_id
    ORDER BY al.created_at DESC
    LIMIT 10
  `);

  return result.rows;
};

export const ActivityService = {
  createActivity,
  getActivities,
};