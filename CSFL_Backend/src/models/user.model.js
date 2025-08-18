import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    membership: {
        type: String,
        required: true,
        default: "silver"
    },
    ownedPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        default: []
    }],
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiry: {
        type: Date,
    }
})

const User = mongoose.model("User", userSchema);

export default User;