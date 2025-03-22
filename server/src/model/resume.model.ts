import mongoose, { Schema } from "mongoose";
import fileTypes from "../config/pdf";

const resumeSchema = new Schema({
  filename: { type: String, required: true },
  s3Key: { type: String, required: true },
  fileType: { type: String, enum: [fileTypes.PDF, fileTypes.DOCX], required: true },
  extractedSkills: [{type: String}],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
    timestamps: true
});


const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;