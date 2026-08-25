import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "NORMAL" }
}, { timestamps: true })

const modelSchema = mongoose.model('singupUser', userSchema)
export { modelSchema }