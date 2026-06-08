import { pool } from "../../db";

/**
 * KPI CARDS
 */
export const getKpis = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM projects) AS total_projects,
      (SELECT COUNT(*) FROM tasks) AS total_tasks,
      (SELECT COUNT(*) FROM tasks WHERE status='completed') AS completed_tasks,
      (SELECT COUNT(*) FROM tasks WHERE status!='completed') AS pending_tasks,
      (SELECT COUNT(*) FROM tasks 
        WHERE due_date < NOW() AND status != 'completed'
      ) AS overdue_tasks
  `);

  return result.rows[0];
};

export const getProjectSummary = async () => {
  const result = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.status,
      p.deadline,
      
      COUNT(t.id) AS total_tasks,
      COUNT(CASE WHEN t.status='completed' THEN 1 END) AS completed_tasks,
      COUNT(CASE WHEN t.status!='completed' THEN 1 END) AS pending_tasks,

      ROUND(
        (COUNT(CASE WHEN t.status='completed' THEN 1 END)::float /
        NULLIF(COUNT(t.id),0)) * 100
      ,2) AS progress_percentage

    FROM projects p
    LEFT JOIN tasks t ON t.project_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC;
  `);

  return result.rows;
};

export const getTaskStatusDistribution = async () => {
  const result = await pool.query(`
    SELECT status, COUNT(*) AS count
    FROM tasks
    GROUP BY status
  `);

  return result.rows;
};

export const getTaskPriorityDistribution = async () => {
  const result = await pool.query(`
    SELECT priority, COUNT(*) AS count
    FROM tasks
    GROUP BY priority
  `);

  return result.rows;
};

export const getTeamWorkload = async () => {
  const result = await pool.query(`
    SELECT
      u.id,
      u.name,
      COUNT(t.id) AS total_tasks,
      COUNT(CASE WHEN t.status='completed' THEN 1 END) AS completed_tasks,
      COUNT(CASE WHEN t.status!='completed' THEN 1 END) AS pending_tasks
    FROM users u
    LEFT JOIN tasks t ON t.assigned_to = u.id
    GROUP BY u.id
    ORDER BY total_tasks DESC;
  `);

  return result.rows;
};

export const getUpcomingDeadlines = async () => {
  const result = await pool.query(`
    SELECT
      id,
      title,
      due_date,
      status,
      project_id
    FROM tasks
    WHERE status != 'completed'
    ORDER BY due_date ASC
    LIMIT 10
  `);

  return result.rows;
};

export const DashboardService = {
  getKpis,
  getProjectSummary,
    getTaskStatusDistribution,
    getTaskPriorityDistribution,
    getTeamWorkload,
    getUpcomingDeadlines,
};