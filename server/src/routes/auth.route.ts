import authController from "../controller/auth.controller";
import { Router } from "express";

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verify);

export const authRouter = router;