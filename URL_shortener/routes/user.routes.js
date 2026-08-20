import express from 'express'
import { handleUser, handleUserLogin } from '../controllers/user.controllers.js'
const userRouter = express.Router()

userRouter.post('/',handleUser)
userRouter.post('/login',handleUserLogin)

export default userRouter