export interface User {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  is_remote: boolean;
  job_url: string;
  salary_min: string;
  salary_max: string;
  currency: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  company_description?: string;
  company_logo?: string;
  company_num_employees?: string;
  company_url?: string;
  date_posted?: string;
  job_function?: string;
}

export interface MatchedJob {
  _id: string;
  company: string;
  title: string;
  description: string;
  location: string;
  job_url: string;
  salary_min: string;
  salary_max: string;
  currency: string;
  is_remote: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  company_description?: string;
  company_logo?: string;
  company_num_employees?: string;
  company_url?: string;
  date_posted?: string;
  job_function?: string;
  skills: string[];
  match_score: number;
  matchedSkills: string[];
  rank: number;
}

export interface Resume {
  _id: string;
  filename: string;
  fileType: string;
  s3Key: string;
  user: string;
  extractedSkills: string[];
  parsedText?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobsResponse = { jobs: Array<Job> };

export type JobRecommendationResponse = {
  jobs: Array<MatchedJob>;
};

export type UserProfileResponse = {
  user: User
}