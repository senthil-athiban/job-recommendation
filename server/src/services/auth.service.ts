import User from "../model/user.model";
import bcryptjs from "bcryptjs";

const loginEmailAndPassword = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return;

    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) throw new Error("Password mismatched");

    if (!user.isEmailVerified) throw new Error("Email not verified");
    return user;
  } catch (error) {
    console.log("failed to verify user:", error);
  }
};

export default {
  loginEmailAndPassword
};
