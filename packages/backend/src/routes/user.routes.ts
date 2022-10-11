import express from 'express'
import * as userController from '../controller/user.controller'

const route = express.Router()
route.post('/', userController.addANewUser)
route.post('/login', userController.login)

export default route
