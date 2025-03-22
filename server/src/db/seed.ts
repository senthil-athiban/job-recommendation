import { connectDB } from "./connect";

import jobs from "../constants/job";
import { Job } from "../model/job.model";

const seedDb = async () => {
    try {
        await connectDB();
        await Job.deleteMany({});
        console.log('Cleared exisiting jobs');

        console.log('Seeding database......');
        const results = await Job.insertMany(jobs);
        console.log(`Successfully seeded ${results.length} jobs`);

        process.exit(0);
    } catch (error) {
        console.error('failed to seed:', error);
        process.exit(1);
    }
}

seedDb();

export default seedDb;