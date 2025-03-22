import userController from "@/controller/user.controller";
import authMiddleware from "@/middlewares/auth";
import { Router } from "express";

const router = Router();

router.get('/me', authMiddleware, userController.getProfile);