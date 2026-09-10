import { Schema, model } from "mongoose";

//storing the user 
const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    varified: { type: Boolean, default: false }
})

const userModel = model('userModel', userSchema);
export default userModel;