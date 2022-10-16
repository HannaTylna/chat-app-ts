import express from 'express'
import * as messageController from '../controller/message.controller'

const messageRoute = express.Router()

messageRoute.get('/', messageController.renderAllMessages)
messageRoute.post('/send', messageController.addANewMsg)

export default messageRoute
