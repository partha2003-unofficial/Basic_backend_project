import express from 'express'
import { handelAnaliticsURL, handleByShortId, handlGenerateNewShortID } from '../controllers/url.controllers.js'
const router = express.Router()

router.post('/',handlGenerateNewShortID)
router.get('/:shortid',handleByShortId)
router.get('/analytics/:shortId',handelAnaliticsURL)


export default router