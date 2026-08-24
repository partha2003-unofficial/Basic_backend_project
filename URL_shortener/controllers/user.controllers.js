import { modelSchema } from "../models/user.model.js";
import { setUser } from '../services/auth.services.js';

async function handleUser(request, response) {
    const { name, email, password } = request.body;
    await modelSchema.create(
        {
            name: name,
            emailID: email,
            password: password
        }
    )
    return response.redirect("/")
}

async function handleUserLogin(request, response) {
    const { email, password } = request.body;
    const userFind = await modelSchema.findOne({ emailID: email, password: password })
    if (!userFind) {
        return response.render('singup.views.ejs', { error: 'invaid username or password , please enter a valid userID and password' })
    }
    const userToken = setUser(userFind) 
    response.cookie('uid', userToken)
    return response.redirect("/")
}
export { handleUser, handleUserLogin }