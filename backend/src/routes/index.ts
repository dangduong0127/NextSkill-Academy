import { Router } from "express";
import userApi from "./user";
import authApi from "./auth";
const router = Router();

router.use("/api/v1/", userApi);
router.use("/api/v1/auth", authApi);

export default router;
