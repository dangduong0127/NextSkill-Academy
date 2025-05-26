import { Router } from "express";
import userApi from "./user";
// import authMiddleware from "../middleware/auth.middleware";
const router = Router();

router.use("/api/v1/", userApi);

export default router;
