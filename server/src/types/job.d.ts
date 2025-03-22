export interface IJob {
    company: string;
    company_description?: string;
    company_logo?: string;
    company_num_employees?: string;
    company_url?: string;
    date_posted?: Date;
    description: string;
    is_remote: boolean;
    job_function?: string;
    job_url: string;
    location: string;
    title: string;
    salary: string;
    skills: string[];
  }
  