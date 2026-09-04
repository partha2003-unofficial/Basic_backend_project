import express from 'express'
import env from 'dotenv'
import userRoute from './routes/user.route.js'
import { connectMongodb } from './connection.mongodb.js';
const application = express()
env.config()

const portId = process.env.PORT;
application.use(express.urlencoded({ extended: false }))
application.set('view engine', 'ejs')

await connectMongodb('mongodb://localhost:27017/blogging_application')

application.get('/', (request, response) => {
    response.render('home.views.ejs')
})
application.use('/user', userRoute)

application.listen(portId, () => console.log('server is running at : ', portId))