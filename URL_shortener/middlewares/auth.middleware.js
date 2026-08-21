import { getUser } from "../services/auth.services.js";

function restictToLoggedinUserOnly(request, response, next) {
    const userUid = request.cookies?.uid; //if the coockies is present then .uid is works
    const user = getUser(userUid);
    if (!userUid || !user) return response.redirect('/login')
    request.user = user;
    next();
}

function chackAuth(request, response, next) {
    const userid = request.cookies?.uid;
    const user = getUser(userid);
    request.user = user;
    next()
}

export { restictToLoggedinUserOnly, chackAuth }