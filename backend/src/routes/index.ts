import { Router } from "express";
import userApi from "./user";
import authApi from "./auth";
import dashboardApi from "./dashboard";

const router = Router();

router.use("/api/v1/", userApi);
router.use("/api/v1/auth", authApi);
router.use("/api/v1/dashboard", dashboardApi);

export default router;
