import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    company: { type: String, required: true },
    company_description: { type: String },
    company_logo: { type: String },
    company_num_employees: { type: String },
    company_url: { type: String },
    date_posted: { type: Date },
    description: { type: String, required: true },
    is_remote: { type: Boolean, default: false },
    job_function: { type: String },
    job_url: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    salary_min: { type: String, required: true },
    salary_max: { type: String, required: true },
    currency: { type: String, required: true },
    skills: [{ type: String }]
  },
  { timestamps: true }
);

const jobMatchSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    resumeId: { type: Schema.Types.ObjectId, required: true },
    recommendations: [
      {
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        match_score: { type: Number, required: true },
        matchedSkills: [{ type: String }],
        rank: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Job = model("Job", jobSchema);
export const JobMatch = model("JobMatch", jobMatchSchema);
