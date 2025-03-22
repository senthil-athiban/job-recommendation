import { Request, Response } from "express";
import { asyncMiddleware } from "../middlewares/asyncHandler";
import jobService from "../services/job.service";

const getAllJobs = asyncMiddleware(async(req: Request, res: Response) => {
    const jobs = await jobService.getJobs();
    res.status(200).send({jobs});
})

const getMatchedJob = asyncMiddleware(async (req: Request, res: Response) => {
    const userId = req.userId;
    const jobs = await jobService.getMatchedJob(userId);
    res.status(200).send({jobs});
})

export default {
    getAllJobs,
    getMatchedJob
}