import { Router } from "express";
import auth from "../../middleware/auth";
import { addMember, createProject, deleteProject, getMembers, getProject, getProjects, removeMember, updateProject } from "../controllers/project.controller";

const router = Router();

router.post("/", auth("admin", "project_manager"), createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.patch("/:id", auth("admin","project_manager"), updateProject);
router.delete("/:id",auth("admin"),deleteProject);
router.post("/:projectId/members",
auth("admin", "project_manager"), addMember);
router.delete("/:projectId/members/:userId", auth("admin", "project_manager"),removeMember);
router.get("/:projectId/members", getMembers);

export default router;