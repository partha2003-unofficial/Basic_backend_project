import { checkUserToken } from "../services/auth.services.js"

function user_Authentication_Middleware(cookieName){
    return (request,responsse,next) => {
        const userToken = request.cookies[cookieName]
        if(!userToken) {return next()}   
        try {
            const userPayload = checkUserToken(userToken);
            request.userPayload = userPayload;
        } catch (error) {return next() }

        return next();
    }
}
export {user_Authentication_Middleware}