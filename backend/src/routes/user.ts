import { Router } from "express";
import { getAllUsers } from "../controllers/user.controllers";
const router = Router();

router.get("/getAllUsers", getAllUsers);

export default router;
