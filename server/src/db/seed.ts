import { connectDB } from "./connect";
import { Job } from "../model/job.model";
import { scrapeRemoteOK } from "../utils/scraper";

const seedDb = async () => {
    try {
        await connectDB();
        await Job.deleteMany({});
        console.log('Cleared exisiting jobs');

        console.log('Seeding database......');
        await scrapeRemoteOK();
        console.log(`Successfully seeded jobs`);

        process.exit(0);
    } catch (error) {
        console.error('failed to seed:', error);
        process.exit(1);
    }
}

seedDb();

export default seedDb;