import express from 'express'
import userRoute from './user.routes'
import messageRoute from './message.routes'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
router.use('/users', userRoute)
router.use('/messages', authenticateToken)
router.use('/messages', messageRoute)

export default router
