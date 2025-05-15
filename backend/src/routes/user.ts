import { Router } from "express";
import {
  getAllUsers,
  createUser,
  loginController,
} from "../controllers/user.controllers";
const router = Router();

router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);
router.post("/login", loginController);

export default router;
