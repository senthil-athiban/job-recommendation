import { Router } from "express";
import multer from "multer";
import ApiError from "../config/error";
import resumeController from "../controller/resume.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    callback(null, true);
  } else {
    callback(new ApiError(400, "Only PDF and DOCX files are allowed"));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // ~ 5MB
  },
  fileFilter: fileFilter,
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  resumeController.uploadResume
);
router.get("/all", authMiddleware, resumeController.getAllResume);
router.get("/:resumeId", authMiddleware, resumeController.getResumeById);

export const resumeRouter = router;
