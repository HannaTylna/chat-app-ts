import express from 'express'
import { getAllMessages } from '../controller/message.controller'

const router = express.Router()

router.get('/', getAllMessages)
router.get('/send')

export default router
