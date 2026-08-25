import jwt from 'jsonwebtoken'
const secretKey = 'partha2003@';

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.emailID,
        role: user.role
    }
    return jwt.sign(payload, secretKey) //JWT token
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