import express from 'express'
import * as messageController from '../controller/message.controller'
import { authenticateToken } from '../middleware/auth'

const messageRoute = express.Router()
messageRoute.get('/', messageController.renderAllMessages)
messageRoute.use('/', authenticateToken)
messageRoute.post('/send', messageController.addANewMsg)

export default messageRoute
