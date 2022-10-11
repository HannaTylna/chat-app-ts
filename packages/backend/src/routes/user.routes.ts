import express from 'express'
import * as userController from '../controller/user.controller'

const route = express.Router()
route.use('/', userController.addANewUser)

export default route
