import express, { response } from 'express'
import urlModel from '../models/url.model.js'
const router = express.Router()

router.get('/', async (request, response) => {
    const allURLs = await urlModel.find({})
    response.render('index.views.ejs',
        { urls: allURLs })
})

export default router 