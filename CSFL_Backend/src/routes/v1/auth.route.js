import { sendOtp } from "../../controllers/auth.controller.js";
import { verifyOtp } from "../../controllers/auth.controller.js";
import { login } from "../../controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/login", login);

export default authRouter;