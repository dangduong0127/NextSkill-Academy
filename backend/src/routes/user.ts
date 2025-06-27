import { Router } from "express";
import {
  getAllUsers,
  deleteUserController,
  updateUserController,
  getMessageController,
  uploadController,
} from "../controllers/user.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router();

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.delete("/deleteUser/:userId", authMiddleware, deleteUserController);
router.put("/updateUser/:userId", authMiddleware, updateUserController);
router.get("/getMessage", authMiddleware, getMessageController);
router.post("/upload", authMiddleware, uploadController);

export default router;
