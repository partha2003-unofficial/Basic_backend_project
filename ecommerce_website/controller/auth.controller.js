import bcrypt from 'bcryptjs'
import userModel from "../models/user.model.js";
import { sendEmail } from '../utils/sendEmail.utils.js';
import { setUserToken } from '../services/token.service.js';

async function userRegistration(request, response) {
    const { name, email, password } = request.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        })
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const message = `wellcome to shop.dev, ${name}! THANK YOU for your regestration, we are exaited to having you a part of our community. To complete your regestration, please follow the regestration otp, Your otp for regestration is : ${otp}`

            //function for sending the otp
            sendEmail(email, 'wellcome to the application name and your otp for registration', message);

            //send the response to the server 
            return response.status(201).json({
                id: user._id,
                name: user.name,
                role: user.role,
                token: setUserToken(user)
            })
        } else {
            response.status(404).json({ message: 'the user is not created!' })
        }
    } catch (error) {
        response.status(500).json({ message: 'server error' })
    }
}

async function userLogin(request, response) {
    try {
        const { email, password } = request.body;
        const user = await userModel.find({ email });
        if (user) {
            const compareBcryptPassword = await bcrypt.compare(password, user.password) //compare with the normal password and the bcrypt passward the is store in database
            if (compareBcryptPassword) {
                return response.status(200).json({
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    token: setUserToken(user)
                })
            }
        } else {
            response.status(404).json({ message: "the user is not found!" })
        }
    } catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}

async function getUser(request, response) {
    try {
        const getUser = await userModel.find({}).select('-password')
        return response.status(201).json(getUser)
    } catch (error) {
        response.status(500).json({ message: 'server error' })
    }
}
export { userRegistration, userLogin, getUser }