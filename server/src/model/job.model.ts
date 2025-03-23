import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    company: { type: String, required: true },
    company_description: { type: String },
    company_logo: { type: String },
    company_num_employees: { type: String },
    company_url: { type: String },
    date_posted: { type: Date, index: true },
    description: { type: String, required: true },
    is_remote: { type: Boolean, default: false },
    job_function: { type: String, index: true },
    job_url: { type: String, required: true },
    location: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    salary_min: { type: String, required: true },
    salary_max: { type: String, required: true },
    currency: { type: String, required: true },
    skills: [{ type: String }]
  },
  { timestamps: true }
);
jobSchema.index({ location: 1, title: 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ title: "text", description: "text"});

const jobMatchSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    resumeId: { type: Schema.Types.ObjectId, required: true, index: true },
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

jobMatchSchema.index({ userId: 1, resumeId: 1 });
jobMatchSchema.index({ "recommendations.jobId": 1 });
jobMatchSchema.index({ "recommendations.match_score": 1 });

export const Job = model("Job", jobSchema);
export const JobMatch = model("JobMatch", jobMatchSchema);
