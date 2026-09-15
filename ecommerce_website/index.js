import express from 'express'
import path from 'path'
import authRoute from './routes/auth.route.js'
import { connectMongodb } from './config/connection.mongodb.config.js'
import productRoute from './routes/products.route.js'
import env from 'dotenv'
env.config()

const PORT = process.env.PORT || 8000;
const applicaiton = express();

applicaiton.use(express.json())
applicaiton.use(express.urlencoded({ extended: true }))

await connectMongodb(process.env.MONGODB_URL)

applicaiton.use('/api/auth', authRoute);
applicaiton.use('/api/products',productRoute)
// applicaiton.use('api/orders')
// applicaiton.use('api/payment')
// applicaiton.use('api/analytics')


applicaiton.listen(PORT, () => console.log('the server is running'))