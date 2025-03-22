import axios from 'axios';
import { Job } from "../model/job.model";
import { cleanHtml } from "./helpers";
import { SCRAPE_API } from '../config/config';

export const scrapeRemoteOK = async () => {
  try {
    const { data } = await axios.get(`${SCRAPE_API}/api`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      },
      timeout: 30000
    });
    
    const jobsData = Array.isArray(data) && data.length > 0 ? data.slice(1) : [];
    
    console.log(`Found ${jobsData.length} jobs`);
    
    if (jobsData.length === 0) {
      console.warn('No jobs found in API response. Response may be empty or formatted differently.');
      console.log('Response preview:', JSON.stringify(data).substring(0, 200) + '...');
    }
    
    const jobs = jobsData.map(job => {
      const job_url = job.url.startsWith('http') ? job.url : `${SCRAPE_API}${job.url}`;
      
      return {
        company: job.company || 'Unknown Company',
        company_description: cleanHtml(job.about || job.company_description || ''),
        company_logo: job.company_logo || '',
        company_num_employees: '',
        company_url: job.company_url || '',
        date_posted: job.date ? new Date(job.date) : new Date(),
        description: cleanHtml(job.description)|| '',
        is_remote: true,
        job_function: job.position || '',
        job_url,
        location: job.location || 'Remote',
        title: job.position || job.title || 'No Title',
        salary_min: job.salary_min || 'Not Disclosed',
        salary_max: job.salary_max || 'Not Disclosed',
        currency: job.currency || 'USD',
        skills: job.tags || []
      };
    });
    
    
    for (const job of jobs) {
      try {
        await Job.findOneAndUpdate(
          { job_url: job.job_url }, 
          job, 
          { upsert: true, new: true }
        );
      } catch (dbError:any) {
        console.error(`Error saving job ${job.job_url}:`, dbError.message);
      }
    }
    return jobs;
  } catch (error:any) {
    console.error("Error fetching from RemoteOK API:", error.message);
  }
};