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
import { rateLimit } from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      status: options.statusCode,
      success: false,
      error: "Rate limit exceeded",
      message: "Bạn đã đăng nhập quá nhiều lần. Vui lòng thử lại sau 5 phút",
    });
  },
});

router.post("/createUser", createUser);
router.post("/login", loginLimiter, loginController);
router.post("/logout", logoutController);
router.get("/check-auth", authMiddleware, checkAuthController);
router.post("/me/:userId", authMiddleware, getUserController);
router.put("/refresh-token", refreshTokenController);

export default router;
