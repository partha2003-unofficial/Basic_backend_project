import { getUser } from "../services/auth.services.js";

function chackAuthentication(request, response, next) {
    const userid = request.cookies?.uid; //if the coockies is present then .uid is works
    if (!userid) return next()
    const user = getUser(userid);
    request.user = user;
    return next()
}
function restictToLoggedinAuthorizationUserOnly(roles = []) {
    return function (request, response, next) {
        if (!request.user) return response.redirect('/login');
        if (!roles.includes(request.user.role)) return response.end('UnAuthorized!');
        return next();
    }
}

export { restictToLoggedinAuthorizationUserOnly, chackAuthentication }