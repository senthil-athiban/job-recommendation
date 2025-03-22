import { NextFunction, Request, Response } from "express";
import ApiError from "../config/error";

const errorHanlder = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
      }
      
    if(err instanceof ApiError){
        res.status(err.status).send({message: err.message});
        return;
    }
    res.status(500).send({message: err.message || "Internal Server Error"});
}

export default errorHanlder;