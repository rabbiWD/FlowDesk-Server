import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/refresh', refreshToken);
// router.post('/logout', logout);

export default router;