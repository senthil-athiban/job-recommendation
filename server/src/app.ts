import express from "express";
import cors from "cors";
import { config } from "dotenv";
import nodeSchedule from "node-schedule";
import { rateLimit } from 'express-rate-limit'
import { authRouter } from "./routes/auth.route";
import { connectDB } from "./db/connect";
import { userRouter } from "./routes/user.route";
import errorHandler from "./middlewares/error";
import { resumeRouter } from "./routes/resume.route";
import { jobRouter } from "./routes/job.route";
import { scrapeRemoteOK } from "./utils/scraper";
import { corsOptions } from "./middlewares/cors";

config();

const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20, // Stricter limit for auth routes
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

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

app.use('/api/v1/auth', authLimiter, authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/resume', resumeRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(errorHandler);

app.listen(8080,  async () => {
  console.log("Server started on PORT 8080");
  await connectDB();
});
