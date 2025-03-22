import { JWT_SECRET } from "@/config/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers.authorization;
    console.log('headers:', headers);
    const token = headers?.split(" ").at(1);

    if (!token) throw new Error("Token was not provided");
    const payload = jwt.verify(token, JWT_SECRET);
    const userId = payload.sub as string;
    console.log("userId:", userId);
    req.userId = userId;
    next();
  } catch (error) {
    console.log("error:", error);
  }
};

export default authMiddleware;
