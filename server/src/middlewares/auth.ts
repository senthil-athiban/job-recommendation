import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers.authorization;
    const token = headers?.split(" ").at(1);

    if (!token) throw new Error("Token was not provided");
    const payload = jwt.verify(token, JWT_SECRET);
    const userId = payload.sub as string;
    req.userId = userId;
    next();
  } catch (error) {
    if(error instanceof JsonWebTokenError) {
        console.log('token error:', error);
        if(error instanceof TokenExpiredError) {
            throw new Error('Token expired');
        }
    }
    console.log("error:", error);
  }
};

export default authMiddleware;
