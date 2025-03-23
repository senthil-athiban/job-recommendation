import { Router } from "express";
import jobController from "../controller/job.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();
router.get('/all', authMiddleware, jobController.getAllJobs);
router.get('/matched', authMiddleware, jobController.getMatchedJob)

export const jobRouter = router;