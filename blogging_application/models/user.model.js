import mongoose from "mongoose";
import { createHmac, randomBytes } from 'crypto'

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    salt: { type: String },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    profileImage: { type: String, default: '../public/image/default.png' }
}, { timestamps: true })

userSchema.pre('save', function () {
    const user = this;
    if (!user.isModified('password')) { return next() };
    const salt = randomBytes(16).toString(); //create a random byte (in buffer) and create the buffer in string
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')
    /*
    HMAC (Hash-based Message Authentication Code: 
    createHmac('sha256', salt): "I want to use the SHA-256 algorithm, and use salt as the secret key." 
    .update(user.password): This gives the HMAC the data that should be processed.
    .digest('hex'): inish the HMAC calculation and give me the result as a hexadecimal string.
    Without 'hex', Node.js returns a Buffer.
    With 'hex', you get something like: a4f8c9d7e2b1...
    */
    this.salt = salt;
    this.password = hashedPassword;

})

const userModel = mongoose.model('bloging_user', userSchema)
export default userModel 