import { User } from '@chat-app/shared'
import { Request, Response } from 'express'
import { UserModel } from '../models/users'
import { registerUser } from '../services/user.services'

export const addANewUser = async (req: Request, res: Response) => {
  const body = req.body as User
  try {
    const existUser = await UserModel.findOne({ email: body.email })
    if (existUser) {
      res.send({ message: 'User is already exist!' })
    }
    if (body.username == '' || !body.username) {
      res.send({ message: 'You need to enter username!' })
    }
    if (body.email == '' || !body.email) {
      res.send({ message: 'You need to enter email!' })
    }
    if (body.password == '' || !body.password) {
      res.send({ message: 'You need to enter password!' })
    }
    res.send(await registerUser(body))
  } catch (error) {
    return res.status(500)
  }
}
