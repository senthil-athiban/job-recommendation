import express, { Request, Response } from "express";
import cors from "cors";
import User from "./model/user.model";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.info("Connected to MongoDB");
});
app.post("/api/v1/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send({ message: "Email already registered" });
    }
    const newUser = new User({ email, password, name });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.log("failed to save :", error);
  }
});

app.listen(8080, () => {
  console.log("Server started on PORT 8080");
});
