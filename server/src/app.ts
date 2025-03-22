import express from "express";
import cors from "cors";
import { config } from "dotenv";
import nodeSchedule from "node-schedule";
import { authRouter } from "./routes/auth.route";
import { connectDB } from "./db/connect";
import { userRouter } from "./routes/user.route";
import errorHandler from "./middlewares/error";
import { resumeRouter } from "./routes/resume.route";
import { jobRouter } from "./routes/job.route";
import { scrapeRemoteOK } from "./utils/scraper";

config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// scheduler job to scrap the website at every mid night
nodeSchedule.scheduleJob('0 0 0 * * *', async () => {
  console.log('Running scheduled job scraping:', new Date().toISOString());
  try {
    await scrapeRemoteOK();
    console.log('Job scraping completed successfully at', new Date().toISOString());
  } catch (error) {
    console.error('Scheduled job scraping failed:', error);
  }
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/resume', resumeRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(errorHandler);

app.listen(8080,  async () => {
  console.log("Server started on PORT 8080");
  await connectDB();
});
