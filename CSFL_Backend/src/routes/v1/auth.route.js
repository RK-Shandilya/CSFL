import { 
  signup, 
  verifyOtp, 
  login, 
  resendOtp, 
  forgotPassword, 
  resetPassword,
  logout 
} from "../../controllers/auth.controller.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import rateLimiter from "../../middlewares/rateLimitter.middleware.js";
import { 
  loginSchema, 
  registerSchema, 
  resendOtpSchema, 
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema 
} from "../../schemas/auth.schema.js";
import { zodValidator } from "../../validators/zod.validator.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", zodValidator(registerSchema), signup);
authRouter.post("/verify-otp", zodValidator(verifyOtpSchema), verifyOtp);
authRouter.post("/login", rateLimiter, zodValidator(loginSchema), login);
authRouter.post("/resend-otp", zodValidator(resendOtpSchema), resendOtp);

authRouter.post("/forgot-password", zodValidator(forgotPasswordSchema), forgotPassword);
authRouter.post("/reset-password/:resetToken", zodValidator(resetPasswordSchema), resetPassword);

authRouter.post("/logout", verifyToken, logout);

export default authRouter;