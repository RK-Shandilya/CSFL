import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
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
})

const User = mongoose.model("User", userSchema);

export default User;