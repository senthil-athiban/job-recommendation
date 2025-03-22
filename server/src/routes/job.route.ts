import { Router } from "express";
import jobController from "../controller/job.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();
router.get('/all', authMiddleware, jobController.getAllJobs);
router.get('/recommended', authMiddleware, jobController.getMatchedJob)

export const jobRouter = router;