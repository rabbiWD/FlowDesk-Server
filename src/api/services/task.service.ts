import { pool } from "../../db";
import type { ITask } from "../../types/task";


export const createTask = async (payload: ITask) => {
  
  const duplicate = await pool.query(
    `SELECT * FROM tasks 
     WHERE title=$1 AND project_id=$2`,
    [payload.title, payload.project_id],
  );

  if (duplicate.rows.length) {
    throw new Error("This task already exists in the project.");
  }

  
  const today = new Date();
  const dueDate = new Date(payload.due_date);

  if (dueDate < today) {
    throw new Error("Please select a valid deadline.");
  }

  
  const result = await pool.query(
    `INSERT INTO tasks
    (
      title,
      description,
      project_id,
      assigned_to,
      priority,
      status,
      due_date,
      created_by
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
      payload.title,
      payload.description,
      payload.project_id,
      payload.assigned_to || null,
      payload.priority,
      payload.status || "todo",
      payload.due_date,
      payload.created_by,
    ],
  );

  return result.rows[0];
};


export const getTasks = async () => {
  const result = await pool.query(`
    SELECT * FROM tasks
    ORDER BY created_at DESC
  `);

  return result.rows;
};


export const getTaskById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM tasks WHERE id=$1`, [id]);

  return result.rows[0];
};


export const updateTask = async (id: string, payload: Partial<ITask>) => {
 
  const task = await pool.query(`SELECT * FROM tasks WHERE id=$1`, [id]);

  if (task.rows[0]?.status === "completed") {
    throw new Error("Completed tasks cannot be reassigned.");
  }

  const result = await pool.query(
    `UPDATE tasks
     SET
       title = COALESCE($1,title),
       description = COALESCE($2,description),
       assigned_to = COALESCE($3,assigned_to),
       priority = COALESCE($4,priority),
       status = COALESCE($5,status),
       due_date = COALESCE($6,due_date)
     WHERE id=$7
     RETURNING *`,
    [
      payload.title,
      payload.description,
      payload.assigned_to,
      payload.priority,
      payload.status,
      payload.due_date,
      id,
    ],
  );

  return result.rows[0];
};


export const deleteTask = async (id: string) => {
  await pool.query(`DELETE FROM tasks WHERE id=$1`, [id]);
};

export const changeTaskStatus = async (id: string, status: string) => {
  const result = await pool.query(
    `UPDATE tasks
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, id],
  );

  return result.rows[0];
};


export const filterTasks = async (query: any) => {
  let sql = `SELECT * FROM tasks WHERE 1=1`;
  const values: any[] = [];

  if (query.status) {
    values.push(query.status);
    sql += ` AND status=$${values.length}`;
  }

  if (query.priority) {
    values.push(query.priority);
    sql += ` AND priority=$${values.length}`;
  }

  if (query.project_id) {
    values.push(query.project_id);
    sql += ` AND project_id=$${values.length}`;
  }

  if (query.search) {
    values.push(`%${query.search}%`);
    sql += ` AND title ILIKE $${values.length}`;
  }

  sql += ` ORDER BY created_at DESC`;

  const result = await pool.query(sql, values);

  return result.rows;
};

export const taskService = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  changeTaskStatus,
  filterTasks,
};
