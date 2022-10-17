import express from 'express'
import { getAllMessages, newMessage } from '../controller/message.controller'

const router = express.Router()

router.get('/', getAllMessages)
router.post('/send', newMessage)

export default router
