import express from 'express'
import * as userController from '../controller/user.controller'
import { authenticateToken } from '../middleware/auth'

const route = express.Router()
route.post('/', userController.addANewUser)
route.post('/login', userController.loginUser)
route.use('/userInfo', authenticateToken)
route.get('/userInfo', userController.getUserInfo)

export default route
