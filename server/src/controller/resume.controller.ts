import { Request, Response } from "express";
import { asyncMiddleware } from "../middlewares/asyncHandler";
import resumeService from "../services/resume.service";
import ApiError from "../config/error";
import jobService from "../services/job.service";
import { cleanUpDisk } from "../utils/helpers";

const getResumeById = asyncMiddleware(async (req: Request, res: Response) => {
  const userId = req.userId;
  const resumeId = req.params.resumeId;
  const resume = await resumeService.getById(userId, resumeId);
  res.status(200).send(resume);
});

const getAllResume = asyncMiddleware(async (req: Request, res: Response) => {
  const userId = req.userId;
  const resume = await resumeService.getAllResume(userId);
  res.status(200).send(resume);
});

const uploadResume = asyncMiddleware(async (req: Request, res: Response) => {
  const userId = req.userId;
  const file = req.file;
  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  const resume = await resumeService.uploadResume(userId, file);
  
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  // Parse PDF text
  const { matchedJobs, updatedResume } = await jobService.updateRecommendedJobs(userId, resume, req.file);
   
  cleanUpDisk(file.path);

  res.status(201).send({
    success: true,
    message: "Resume uploaded successfully",
    data: updatedResume,
    recommendedJobs: matchedJobs,
  });
});

export default {
  getAllResume,
  getResumeById,
  uploadResume,
};
