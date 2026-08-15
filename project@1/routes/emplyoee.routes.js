import express from 'express'
const router = express.Router()
import { allEmployeeDetailes, employeeDetailsBy_ID, employeeDeleteBy_ID, createNewUser_mongodb_post } from '../controllers/employee.controller.js'


router.get('/', allEmployeeDetailes)

router.route('/:id')
  .get(employeeDetailsBy_ID)
  .delete(employeeDeleteBy_ID)

router.post('/', createNewUser_mongodb_post)

export default router