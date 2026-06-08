import { Router } from "express";
import { getDeadlines, getKpis, getPriority, getProjectSummary, getTaskStatus, getTeamWorkload } from "../controllers/dashboard.controller";

const router = Router();

router.get("/kpis", getKpis);
router.get("/projects", getProjectSummary);
router.get("/tasks/status", getTaskStatus);
router.get("/tasks/priority", getPriority);
router.get("/team/workload", getTeamWorkload);
router.get("/deadlines", getDeadlines);

export default router;