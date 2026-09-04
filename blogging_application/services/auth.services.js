import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()
const secretKey = process.env.secretKey;

function setUserToken(user) {

    const payload = {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
    }
    const token = jwt.sign(payload, secretKey);
    return token;
}

function checkUserToken(token) {
    const validatation = jwt.verify(token, secretKey)
    return validatation;
}

export { setUserToken, checkUserToken }