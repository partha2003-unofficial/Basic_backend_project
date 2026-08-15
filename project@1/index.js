import express from 'express'
import mongoose from 'mongoose';
import empolyeeRouter from './routes/emplyoee.routes.js'
import { connectionMongodb } from './connection.mongodb.js'

const application = express()

const PORT = 8000;

//conection in mongodb
connectionMongodb('mongodb://localhost:27017/employee_details')


application.use(express.urlencoded({ extended: false })) //middleware 

application.use('/api/employees', empolyeeRouter) //router

application.listen(PORT, () => { console.log(`the server is running.. in the PORT : ${PORT}`) })