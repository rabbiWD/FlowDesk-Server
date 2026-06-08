import type { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export const getKpis = async (req: Request, res: Response) => {
  try {
    const data = await DashboardService.getKpis();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch KPIs",
      error,
    });
  }
};

export const getProjectSummary = async (req: Request, res: Response) => {
  try {
    const data = await DashboardService.getProjectSummary();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project summary",
      error,
    });
  }
};

export const getTaskStatus = async (req: Request, res: Response) => {
  try {
    const data = await DashboardService.getTaskStatusDistribution();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch task status",
      error,
    });
  }
};

export const getPriority = async (req: Request, res: Response) => {
  try {
    const data = await DashboardService.getTaskPriorityDistribution();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch priority data",
      error,
    });
  }
};

export const getTeamWorkload = async (req: Request, res: Response) => {
  try {
    const data = await DashboardService.getTeamWorkload();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team workload",
      error,
    });
  }
};

export const getDeadlines = async (req: Request, res: Response) => {
  try {
    const data = await DashboardService.getUpcomingDeadlines();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deadlines",
      error,
    });
  }
};