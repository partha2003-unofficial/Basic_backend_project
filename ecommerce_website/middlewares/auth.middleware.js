import userModel from "../models/user.model.js";
import { chackUserToken } from "../services/token.service.js";

async function protectUserLogin(request, response, next) {
    try {
        if (request.headers.authorization && request.headers.authorization.startWith('bearer')) {
            const token = request.headers.authorization.split(' ')[1];
            const decode = chackUserToken(token);
            if (decode) {
                const findUser = userModel.findById(decode._id).select('-password')
                request.user = findUser;
                return next()
            }
            else { response.status(404).json({ message: 'the user is not valided' }) }
        } else {
            return response.status(404).json({ message: 'token is not founded!' })
        }
    } catch (error) {
        return response.status(500).json({ message: 'internal server error' })
    }
}

async function adminUser(request, response, next) {
    try {
        if (request.user && request.user.role === 'admin') {
            return next()
        } else { return response.status(404).json({ message: 'the user is not authorizied to access this url' }) }
    }
    catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}
export { protectUserLogin, adminUser }