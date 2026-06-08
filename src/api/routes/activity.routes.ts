import { Router } from "express";
import auth from "../../middleware/auth";
import { createActivity, getActivities } from "../controllers/activity.controller";

const router = Router();

router.get("/", getActivities);
router.post("/", auth("admin"),createActivity);

export default router;