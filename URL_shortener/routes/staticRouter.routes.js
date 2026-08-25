import express from 'express'
import urlModel from '../models/url.model.js'
import { restictToLoggedinAuthorizationUserOnly } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.get('/', restictToLoggedinAuthorizationUserOnly(['NORMAL', 'ADMIN']), async (request, response) => {
    if (!request.user) return response.redirect('/login')
    const allURLs = await urlModel.find({ createdBy: request.user._id })
    response.render('index.views.ejs',
        { urls: allURLs })
})

router.get('/admin', restictToLoggedinAuthorizationUserOnly(['ADMIN']), async (request, response) => {
    if (!request.user) return response.redirect('/login')
    const allURLs = await urlModel.find({})
    response.render('index.views.ejs',
        { urls: allURLs })
})

router.get('/singup', (request, response) => {
    return response.render('singup.views.ejs')
})

router.get('/login', (request, response) => {
    return response.render('login.views.ejs')
})
export default router 