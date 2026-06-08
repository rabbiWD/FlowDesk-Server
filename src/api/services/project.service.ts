import { pool } from "../../db";
import type { IProject } from "../../types/project";

export const createProject = async (payload: IProject) => {
  const result = await pool.query(
    `
    INSERT INTO projects
    (
      name,
      description,
      deadline,
      created_by
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      payload.name,
      payload.description,
      payload.deadline,
      payload.created_by,
    ]
  );

  return result.rows[0];
};

export const getProjects = async () => {
  const result = await pool.query(`
    SELECT *
    FROM projects
    ORDER BY created_at DESC
  `);

  return result.rows;
};

export const getProject = async (id: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM projects
    WHERE id=$1
    `,
    [id]
  );

  return result.rows[0];
};

export const updateProject = async (
  id: string,
  payload: Partial<IProject>
) => {
  const result = await pool.query(
    `
    UPDATE projects
    SET
      name=COALESCE($1,name),
      description=COALESCE($2,description),
      deadline=COALESCE($3,deadline),
      status=COALESCE($4,status)
    WHERE id=$5
    RETURNING *
    `,
    [
      payload.name,
      payload.description,
      payload.deadline,
      payload.status,
      id,
    ]
  );

  return result.rows[0];
};

export const deleteProject = async (id: string) => {
  await pool.query(
    `
    DELETE FROM projects
    WHERE id=$1
    `,
    [id]
  );
};

export const addMember = async (
  projectId: string,
  userId: string
) => {
  const result = await pool.query(
    `
    INSERT INTO project_members
    (
      project_id,
      user_id
    )
    VALUES ($1,$2)
    RETURNING *
    `,
    [projectId, userId]
  );

  return result.rows[0];
};

export const removeMember = async (
  projectId: string,
  userId: string
) => {
  await pool.query(
    `
    DELETE FROM project_members
    WHERE project_id=$1
    AND user_id=$2
    `,
    [projectId, userId]
  );
};

export const getMembers = async (
  projectId: string
) => {
  const result = await pool.query(
    `
    SELECT
      users.id,
      users.name,
      users.email,
      users.role
    FROM project_members
    JOIN users
      ON users.id = project_members.user_id
    WHERE project_id=$1
    `,
    [projectId]
  );

  return result.rows;
};

export const projectService = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  getMembers
};