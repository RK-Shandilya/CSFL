import {z} from "zod";

const passwordValidation = z.string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number");

export const registerSchema = z.object({
    email: z.string().email(),
    password: passwordValidation,
    confirmPassword: z.string(),
    firstName: z.string().min(1, "firstName is required"),
    lastName: z.string().min(1, "lastName is required"),
    membership: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email()
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: passwordValidation,
  confirmPassword: z.string(),
  token: z.string().min(1, "Reset token is required") // This will come from req.params
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const verifyOtpSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
    otp: z.string()
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only digits")
});

export const resendOtpSchema = z.object({
    email: z.string().email("Please provide a valid email address")
});