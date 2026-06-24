import { authController } from "./auth.controller";
import { Router } from "express";

const router = Router();
router.post("/login", authController.loginUser);

export const authRoutes = router;
