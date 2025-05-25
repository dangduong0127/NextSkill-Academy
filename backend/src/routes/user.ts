import { Router } from "express";
import {
  getAllUsers,
  createUser,
  loginController,
  deleteUserController,
  updateUserController,
} from "../controllers/user.controllers";
const router = Router();

router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);
router.post("/login", loginController);
router.delete("/deleteUser/:userId", deleteUserController);
router.put("/updateUser/:userId", updateUserController);

export default router;
