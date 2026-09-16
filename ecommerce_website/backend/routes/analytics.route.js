import { Router } from 'express'
import { getAdminStatus } from '../controller/analytics.controller.js'
import { adminUser, protectUserLogin } from '../middlewares/auth.middleware.js'
const router = Router()

router.get('/', protectUserLogin, adminUser, getAdminStatus)

export default router;