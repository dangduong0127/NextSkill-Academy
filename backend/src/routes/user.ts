import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/user.controllers";
const router = Router();

router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);

export default router;
