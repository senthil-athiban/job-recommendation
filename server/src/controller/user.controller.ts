import { Request, Response } from "express";
import userService from "../services/user.service";

const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        console.log('userId', userId);
        const user = await userService.getUserById(userId);
        if(!user) throw new Error('No user was found');
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).send({ user: userWithoutPassword });
    } catch (error) {
        console.log('failed to fetch profile:', error);
    }
}

export default { getProfile };