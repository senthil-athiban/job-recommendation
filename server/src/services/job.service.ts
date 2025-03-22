import { Job, JobMatch } from "../model/job.model";

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

export default {
    getJobs,
    getMatchedJob
}