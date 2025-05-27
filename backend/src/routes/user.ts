import { Router } from "express";
import {
  getAllUsers,
  deleteUserController,
  updateUserController,
} from "../controllers/user.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router();

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.delete("/deleteUser/:userId", authMiddleware, deleteUserController);
router.put("/updateUser/:userId", authMiddleware, updateUserController);

export default router;
