import express from 'express'
import env from 'dotenv'
import userRoute from './routes/user.route.js'
import { connectMongodb } from './connection.mongodb.js';
import cookieParser from 'cookie-parser';
import { user_Authentication_Middleware } from './middlewares/authentication.middleware.js';
import userBlogs from './routes/blog.route.js'
import blogModel from './models/blog.model.js';
import path from 'path'
const application = express()
env.config()

const portId = process.env.PORT || 5000;
application.use(express.urlencoded({ extended: false }))
application.set('view engine', 'ejs')
application.use(cookieParser())
application.use(user_Authentication_Middleware('useCookies'))
application.use(express.static(path.resolve('./public'))) // for static sarve to the public file 
 
await connectMongodb(process.env.MONGO_URL)

application.get('/', async (request, response) => {
    const allBlogs = await blogModel.find({});
    response.render('home.views.ejs',
        {
            user: request.userPayload,
            blogs: allBlogs
        })
})
application.use('/user', userRoute)
application.use('/blogs', userBlogs)
//next task is handling the dropdown in the navbar

application.listen(portId, () => console.log('server is running at : ', portId))