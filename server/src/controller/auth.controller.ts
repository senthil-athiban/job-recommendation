import { Request, Response } from "express";
import emailService from "../services/email.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";
import { domains } from "../config/config";
import authService from "@/services/auth.service";

const register = async(req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const user = await userService.createUser({email, password, name});
    const token = await tokenService.generateEmailVerificationToken(user.id);
    await emailService.sendVerificationEmail(token, user.email);
    res.status(200).send({message: "Email verification has been sent"});
} 

const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.loginEmailAndPassword(email, password);
    if(!user) return;
    
    const token = await tokenService.generateAuthToken(user.id);
    res.status(200).send({token: token});
} 

const verify = async(req: Request, res: Response) => {
    const token = req.query.token as string;
    if(!token) return;
    await emailService.verifyEmail(token);
    res.redirect(`${domains.client}/login`);
} 

export default {
    register,
    login,
    verify
}