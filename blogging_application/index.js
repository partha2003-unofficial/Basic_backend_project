import express from 'express'
import env from 'dotenv'
import userRoute from './routes/user.route.js'
import { connectMongodb } from './connection.mongodb.js';
import cookieParser from 'cookie-parser';
import { user_Authentication_Middleware } from './middlewares/authentication.middleware.js';
const application = express()
env.config()

const portId = process.env.PORT;
application.use(express.urlencoded({ extended: false }))
application.set('view engine', 'ejs')
application.use(cookieParser())
application.use(user_Authentication_Middleware('useCookies'))

await connectMongodb('mongodb://localhost:27017/blogging_application')

application.get('/', (request, response) => {
    response.render('home.views.ejs', { user: request.userPayload })
})
application.use('/user', userRoute)
//next task is handling the dropdown in the navbar

application.listen(portId, () => console.log('server is running at : ', portId))