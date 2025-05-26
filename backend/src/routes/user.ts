import { Router } from "express";
import {
  getAllUsers,
  createUser,
  loginController,
  deleteUserController,
  updateUserController,
  checkAuthController,
} from "../controllers/user.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router();

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.post("/auth/createUser", createUser);
router.post("/auth/login", loginController);
router.get("/auth/check-auth", authMiddleware, checkAuthController);
router.delete("/deleteUser/:userId", authMiddleware, deleteUserController);
router.put("/updateUser/:userId", authMiddleware, updateUserController);

export default router;
