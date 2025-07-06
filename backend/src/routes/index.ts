import { Router } from "express";
import userApi from "./user";
import authApi from "./auth";
import dashboardApi from "./dashboard";
import courseApi from "./course";

const router = Router();

router.use("/api/v1/", userApi);
router.use("/api/v1/auth", authApi);
router.use("/api/v1/dashboard", dashboardApi);
router.use("/api/v1/courses", courseApi);

export default router;
