import { Router } from 'express'
import { getUser, userLogin, userRegistration } from '../controller/auth.controller.js';
const route = Router();

route.post('/register', userRegistration)
route.post('/login', userLogin)
route.get('/users', getUser); // add two middleware 'protect' and 'admin' this is only for admin

export default route;