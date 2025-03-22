import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import Resume from "../model/resume.model";
import { constructS3Url, uploadFileToS3 } from "../utils/aws";
import ApiError from "../config/error";
import { getFileExtension } from "../utils/helpers";

const getById = (userId: string, resumeId: string) => {
  return Resume.findOne({ user: userId, _id: resumeId });
};

const getAllResume = (userId: string) => {
  return Resume.find({ user: userId });
};

const uploadResume = async (userId: string, file: any) => {
  const fileName = `${uuidv4()}_${file.originalname}`;
  const pathName = `resumes/${userId}/${fileName}`;
  const buffer = fs.readFileSync(file.path);
  const res = await uploadFileToS3({ path: pathName, file: buffer });
  
  if (!(res?.$metadata.httpStatusCode === 200)) throw new ApiError(400, "Failed to upload resume");

  const s3Url = constructS3Url(pathName);
  const fileExtension = getFileExtension(file);

  return await new Resume({
    filename: fileName,
    fileType: fileExtension,
    s3Key: s3Url,
    user: userId,
    extractedSkills: [""],
  }).save();
};

export default {
  getById,
  getAllResume,
  uploadResume,
};
