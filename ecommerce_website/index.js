import express from 'express'
import authRoute from './routes/auth.route.js'
import { connectMongodb } from './config/connection.mongodb.config.js'
import env from 'dotenv'
env.config()

const PORT = process.env.PORT || 8000;
const applicaiton = express();

applicaiton.use(express.json())
applicaiton.use(express.urlencoded({ extended: true }))

await connectMongodb(process.env.MONGODB_URL)

applicaiton.use('/api/auth', authRoute);

applicaiton.listen(PORT, () => console.log('the server is running'))