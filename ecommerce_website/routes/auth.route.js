import { Router } from 'express'
import { getUser, userLogin, userRegistration } from '../controller/auth.controller.js';
import { adminUser, protectUserLogin } from '../middlewares/auth.middleware.js';
const route = Router();

route.post('/register', userRegistration)
route.post('/login', userLogin)
route.get('/users', protectUserLogin, adminUser, getUser); //url for admin and login user only

export default route;