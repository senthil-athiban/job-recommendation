import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { authRouter } from "./routes/auth.route";
import { connectDB } from "./db/connect";
config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.listen(8080,  async () => {
  console.log("Server started on PORT 8080");
  await connectDB();
});
