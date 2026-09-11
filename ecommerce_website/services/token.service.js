import jwt from 'jsonwebtoken'

function setUserToken(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        role: user.role
    }
    return jwt.sign(payload, process.env.PRIVETKEY_JWT)
}

function chackUserToken(token) {
    return jwt.verify(token, process.env.PRIVETKEY_JWT, { expiresIn: '30d' })
}

export { setUserToken, chackUserToken }