import Router from "express";
const router = Router();
import { paginationController } from "../controllers/course.controller";

router.get("", paginationController);

export default router;
