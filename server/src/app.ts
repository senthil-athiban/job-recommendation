import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { authRouter } from "./routes/auth.route";
import { connectDB } from "./db/connect";
import { userRouter } from "./routes/user.route";
import errorHandler from "./middlewares/error";
import { resumeRouter } from "./routes/resume.route";
import { jobRouter } from "./routes/job.route";
config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/resume', resumeRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(errorHandler);

app.listen(8080,  async () => {
  console.log("Server started on PORT 8080");
  await connectDB();
});
