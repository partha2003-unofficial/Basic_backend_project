import express from 'express'
import authRoute from './routes/auth.route.js'
import { connectMongodb } from './config/connection.mongodb.config.js'
import productRoute from './routes/products.route.js'
import orderRoute from './routes/order.route.js'
import paymentRoute from './routes/payment.route.js'
import analytics from './routes/analytics.route.js'
import env from 'dotenv'
env.config()

const PORT = process.env.PORT || 8000;
const applicaiton = express();

applicaiton.use(express.json())
applicaiton.use(express.urlencoded({ extended: true }))

await connectMongodb(process.env.MONGODB_URL)

applicaiton.use('/api/auth', authRoute);
applicaiton.use('/api/products', productRoute)
applicaiton.use('/api/orders', orderRoute)
applicaiton.use('/api/payment', paymentRoute)
applicaiton.use('/api/analytics', analytics)


applicaiton.listen(PORT, () => console.log('the server is running'))