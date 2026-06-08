import { Router } from "express";
import auth from "../../middleware/auth";
import { changeStatus, createTask, deleteTask, filterTasks, getTaskById, updateTask } from "../controllers/task.controller";

const router = Router();


router.post("/", auth("admin", "project_manager"), createTask);
router.get("/", filterTasks);
router.get("/:id", getTaskById);
router.patch("/:id", auth("admin", "project_manager"), updateTask);
router.delete("/:id", auth("admin", "project_manager"), deleteTask);
router.patch("/:id/status",auth("admin", "project_manager"),changeStatus);

export default router;