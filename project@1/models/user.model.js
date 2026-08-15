import mongoose from "mongoose";

//create schema
const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    jobTitle: { type: String, required: true }
}, { timestamps: true })

//create model
const employeeModel = await mongoose.model('company_employee', employeeSchema)

export default employeeModel;