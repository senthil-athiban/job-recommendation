import { domains, emailConfig } from "../config/config";
import { sendGrid } from "../config/mail";
import tokenService from "./token.service";
import User from "../model/user.model";
import tokenTypes from "../config/tokens";

const verifyEmail = async (token: string) => {
  const verifiedToken = await tokenService.verifyToken(
    token,
    tokenTypes.EMAIL_VERIFY
  );

  try {
    if (!verifiedToken) return;
    const user = await User.findById(verifiedToken.user._id);
    if (!user) throw new Error();
    await User.findByIdAndUpdate(user._id, { isEmailVerified: true });
  } catch (error) {
    console.log("failed to verify email:", error);
  }
};

const sendVerificationEmail = async (token: string, to: string) => {
  const subject = "Email Verification";
  const verificationEmailUrl = `${domains.backend}/api/v1/auth/verify-email?token=${token}`;
  const from = emailConfig.from;
  const body = `Dear user,  
  To verify your email, click on this link: ${verificationEmailUrl}`;
  await sendGrid.send({ from, to, subject, text: body });
};

export default {
  verifyEmail,
  sendVerificationEmail,
};
