import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  createUser,
  loginController,
  checkAuthController,
  getUserController,
  logoutController,
  refreshTokenController,
} from "../controllers/user.controllers";
const router = Router();

router.post("/createUser", createUser);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/check-auth", authMiddleware, checkAuthController);
router.post("/me/:userId", authMiddleware, getUserController);
router.put("/refresh-token", refreshTokenController);

export default router;
