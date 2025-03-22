const use = require("@tensorflow-models/universal-sentence-encoder");
const tf = require("@tensorflow/tfjs-node");
import { Job, JobMatch } from "../model/job.model";
import { cosineSimilarity, extractSkills } from "../utils/helpers";
import Resume from "../model/resume.model";
import PdfParse from "pdf-parse";
import fs from "fs";
import ApiError from "../config/error";


const getJobs = async () => {
    try {
      // TODO: add pagination and limit
      return await Job.find();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

export const getMatchedJob = async (userId: string) => {
    return await JobMatch.find({userId});
}

export const updateRecommendedJobs = async (userId: string, resume: any, file: any) => {
  const dataBuffer = fs.readFileSync(file.path);

  const pdfData = await PdfParse(dataBuffer);

  const resumeText = pdfData.text;
  
  const useModel = await use.load();
  if (!useModel) {
    throw new ApiError(500, "NLP model is not loaded yet.");
  }
  
  const jobs = await Job.find();

  const resumeSkills = extractSkills(resumeText, jobs);

  const updatedResume = await Resume.findOneAndUpdate(
    resume._id,
    { 
      parsedText: resumeText, 
      extractedSkills: resumeSkills 
    },
    { new: true }
  );
  
  const resumeEmbeddings = await useModel.embed([resumeText]);
  const resumeEmbeddingArray = await resumeEmbeddings.array();
  const resumeVector = resumeEmbeddingArray[0];

  
  const jobScores = await Promise.all(
    jobs.map(async (item) => {
      const job = item.toObject ? item.toObject() : item;
      const jobEmbeddings = await useModel.embed([job.description]);
      const jobEmbeddingArray = await jobEmbeddings.array();
      const jobVector = jobEmbeddingArray[0];

      const similarityScore = cosineSimilarity(resumeVector, jobVector);
      const matchingSkills = job.skills.filter((skill) =>
        resumeSkills.includes(skill)
      );
      const skillMatchScore = matchingSkills.length / job.skills.length;

      const finalScore = Number((0.7 * similarityScore + 0.3 * skillMatchScore).toFixed(2)) * 100;

      return { ...job, score: finalScore, matchedSkills: matchingSkills };
    })
  );

  const filteredJobs = jobScores.filter((job) => job.matchedSkills.length > 0);
  const sortedJobs = filteredJobs.sort((a, b) => b.score - a.score);

  const matchedJobs = await JobMatch.findOneAndUpdate(
    {userId},
    {
    resumeId: resume.id,
    userId,
    recommendations: sortedJobs.map((job, index) => ({
      jobId: job._id,
      match_score: job.score,
      matchedSkills: job.matchedSkills,
      rank: index + 1,
    })),
  }, {
    upsert: true,
    new: true
  });

  return { matchedJobs, updatedResume };
}
export default {
    getJobs,
    getMatchedJob,
    updateRecommendedJobs
}