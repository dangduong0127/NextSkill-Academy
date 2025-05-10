import { Router } from "express";
import userApi from "./user";
const router = Router();

router.use("/api/v1/", userApi);

export default router;
