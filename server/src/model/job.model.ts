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
    salary: { type: String, required: true },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

const Job = model("Job", jobSchema);

export default Job;
