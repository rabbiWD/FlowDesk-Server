import type { Request, Response } from "express";
import { projectService } from "../services/project.service";
import { logActivity } from "../../utils/activityLogger";

export const createProject = async (req: Request, res: Response) => {
  try {
    const result = await projectService.createProject({
      ...req.body,
      created_by: req.user?.id,
    });

    await logActivity({
      user_id: req.user!.id,
      action: `Created project ${name}`,
      entity_type: "project",
      entity_id: result.id,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProjects();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const result = await projectService.getProject(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const result = await projectService.updateProject(id, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    await projectService.deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    if (
      !projectId ||
      !userId ||
      Array.isArray(projectId) ||
      Array.isArray(userId)
    ) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const result = await projectService.addMember(projectId, userId);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { projectId, userId } = req.params;

    if (
      !projectId ||
      !userId ||
      Array.isArray(projectId) ||
      Array.isArray(userId)
    ) {
      return res.status(400).json({ message: "Invalid data" });
    }

    await projectService.removeMember(projectId, userId);

    res.status(200).json({
      success: true,
      message: "Member removed",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const getMembers = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId || Array.isArray(projectId)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const result = await projectService.getMembers(projectId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
