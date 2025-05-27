import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  createUser,
  loginController,
  checkAuthController,
  getUserController,
  logoutController,
} from "../controllers/user.controllers";
const router = Router();

router.post("/createUser", createUser);
router.post("/login", loginController);
router.get("/check-auth", authMiddleware, checkAuthController);
router.post("/me/:userId", authMiddleware, getUserController);
router.post("/logout", authMiddleware, logoutController);

export default router;
