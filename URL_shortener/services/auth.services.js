import jwt from 'jsonwebtoken'
const secretKey = 'partha2003@';

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.emailID
    }
    return jwt.sign(payload, secretKey) //payload
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey) //varifying through (secretKey)
    } catch (error) {
        return null;
    }
}

export { setUser, getUser }