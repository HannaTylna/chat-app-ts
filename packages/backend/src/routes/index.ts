import express from 'express'
import { authenticateToken } from '../middleware/auth'
import messageRoute from './message.routes'
import userRoute from './user.routes'

const router = express.Router()
router.use('/users', userRoute)
router.use('/messages/send', authenticateToken)
router.use('/messages', messageRoute)

export default router
