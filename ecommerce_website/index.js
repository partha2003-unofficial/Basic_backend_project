import express from 'express'
import authRoute from './routes/auth.route.js'
import env from 'dotenv'
import { connectMongodb } from './connection.mongodb.js';
env.config()

const PORT = process.env.PORT || 8000;
const applicaiton = express();

await connectMongodb(process.env.MONGODB_URL)

applicaiton.use('/api/auth',authRoute);

applicaiton.listen(PORT,()=>console.log('the server is running'))