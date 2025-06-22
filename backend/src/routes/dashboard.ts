import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { chatAdminController } from "../controllers/dashboard.controller";

const router = Router();

router.get("/chat/getMessage/:userId", chatAdminController);

export default router;
