import { User } from '@chat-app/shared'
import { Request, Response } from 'express'
import { UserModel } from '../models/users'
import { registerUser } from '../services/user.services'

export const addANewUser = async (req: Request, res: Response) => {
  const body = req.body as User
  try {
    const existUser = await UserModel.findOne({ email: body.email })
    if (existUser) {
      res.status(403).json({ error: 'User is already exist!' })
    }
    if (body.username == '' || !body.username) {
      res.status(400).json({ error: 'You need to enter username!' })
    }
    if (body.email == '' || !body.email) {
      res.status(400).json({ error: 'You need to enter email!' })
    }
    if (body.password == '' || !body.password) {
      res.status(400).json({ error: 'You need to enter password!' })
    }
    res.send(await registerUser(body))
  } catch (error) {
    return res.status(500)
  }
}
