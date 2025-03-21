import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import { authRouter } from "./routes/auth.route";
config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.info("Connected to MongoDB");
});

app.use('/api/v1/auth', authRouter);

app.listen(8080, () => {
  console.log("Server started on PORT 8080");
});
