import { Router } from "express";
import authController from "../controller/auth.controller";

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verify);

export const authRouter = router;