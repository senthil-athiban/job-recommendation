import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config";

export async function connectDB() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined!");
    }
    await mongoose.connect(MONGODB_URI);
    console.log('Database connection established');
  } catch (error) {
    throw new Error(`failed to connect db: ${error}`);
  }
}