import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiry: {
        type: Date,
        default: Date.now + 15 * 60 * 1000,
    }
})

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;