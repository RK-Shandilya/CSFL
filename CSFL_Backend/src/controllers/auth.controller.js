import bcrypt from "bcrypt";
import otpgenerator from "otp-generator";
import User from "../models/user.model.js";
import mailSender from "../utils/mailSender.js";

export const sendOtp = async (req, res) => {
    try {
        const {name, email, password, confirmPassword, membership} = req.body;
        if(!name || !email || !password || !confirmPassword || !membership){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const otp = otpgenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })

        const otpExpiry = Date.now() + 15 * 60 * 1000;
        await mailSender(email, "OTP for registration", `Your OTP is ${otp}`);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            membership,
            otp,
            otpExpiry
        })

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: newUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const verifyOtp = async(req, res) => {
    try {
        const {email, otp} = req.body;

        if(!email || !otp){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const oldUser = await user.findOne({email});

        if(!oldUser){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if(oldUser.otp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        if(oldUser.otpExpiry < Date.now()){
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            })
        }

        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        })
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        })
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}