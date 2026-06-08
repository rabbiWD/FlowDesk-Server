import type { Request, Response } from "express";
import { ActivityService } from "../services/activity.service";

export const getActivities = async (req: Request, res: Response) => {
  try {
    const result = await ActivityService.getActivities();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error,
    });
  }
};


export const createActivity = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await ActivityService.createActivity({
      ...req.body,
      user_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create activity",
      error,
    });
  }
};