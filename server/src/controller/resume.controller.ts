import { Request, Response } from "express";
import { asyncMiddleware } from "../middlewares/asyncHandler";
import resumeService from "../services/resume.service";
import ApiError from "../config/error";

const getResumeById = asyncMiddleware( async (req: Request, res: Response) => {
    const userId = req.userId;
    const resumeId = req.params.resumeId;
    const resume = await resumeService.getById(userId, resumeId);
    res.status(200).send(resume);
})

const getAllResume = asyncMiddleware( async (req: Request, res: Response) => {
    const userId = req.userId;
    const resume = await resumeService.getAllResume(userId);
    res.status(200).send(resume);
})

const uploadResume = asyncMiddleware( async (req: Request, res: Response) => {
    const userId = req.userId;
    const file = req.file;
    if (!file) {
        throw new ApiError(400, "No file uploaded");
    }
    
    const resume = await resumeService.uploadResume(userId, file);
    res.status(201).send({
        success: true,
        message: "Resume uploaded successfully",
        data: resume
    });
})

export default {
    getAllResume,
    getResumeById,
    uploadResume
}
