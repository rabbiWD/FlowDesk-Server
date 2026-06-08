import type { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { logActivity } from "../../utils/activityLogger";


export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const result = await taskService.createTask({
      ...req.body,
      created_by: req.user?.id,
    });

    await logActivity({
  user_id: req.user!.id,
  action: `Created task ${title}`,
  entity_type: "task",
  entity_id: result.id,
});

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error,
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await taskService.getTasks();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tasks",
      error,
    });
  }
};


export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    const result = await taskService.getTaskById(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get task",
      error,
    });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    const result = await taskService.updateTask(id, req.body);

    await logActivity({
  user_id: req.user!.id,
  action: `Marked task as ${status}`,
  entity_type: "task",
  entity_id: result.id,
});

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    await taskService.deleteTask(id);

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error,
    });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const result = await taskService.changeTaskStatus(id, status);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error,
    });
  }
};

export const filterTasks = async (req: Request, res: Response) => {
  try {
    const result = await taskService.filterTasks(req.query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to filter tasks",
      error,
    });
  }
};