import express, { response } from 'express'
import path from 'path'
import urlRoute from './routes/url.routers.js'
import router from './routes/staticRouter.routes.js'
import { connectionMongodb } from './connnection.mongodb.js';
import userRouter from './routes/user.routes.js';

const application = express()
const PORT = 8000;

//connection with mongodb   
await connectionMongodb(application.response, 'mongodb://localhost:27017/short_url_generater')

//use the ejs
application.set('view engine', 'ejs')
application.set('views', path.resolve('./views'))// tells express that whare is my views file is leave


//adding build in middleware 
application.use(express.json())
application.use(express.urlencoded({ extended: false }))

application.use('/url', urlRoute)
application.use('/', router)
application.use('/user',userRouter)

application.listen(PORT, () => console.log(`server is running , at the port of : ${PORT}`))