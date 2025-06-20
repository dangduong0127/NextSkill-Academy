import { Router } from "express";
import {
  getAllUsers,
  deleteUserController,
  updateUserController,
  getMessageController,
} from "../controllers/user.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router();

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.delete("/deleteUser/:userId", authMiddleware, deleteUserController);
router.put("/updateUser/:userId", authMiddleware, updateUserController);
router.get("/getMessage", authMiddleware, getMessageController);

export default router;
