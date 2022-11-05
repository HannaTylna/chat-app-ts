import { Credentials, User } from '@chat-app/shared'
import { Request, Response } from 'express'
import { createJwtToken, JwtRequest } from '../middleware/auth'
import { UserModel } from '../models/users'
import { registerUser, login } from '../services/user.services'

export const addANewUser = async (req: Request, res: Response) => {
  const body = req.body as User
  try {
    const existUser = await UserModel.findOne({ username: body.username }).exec()
    if (existUser) {
      res.status(403).json({ error: 'User is already exist!' })
    } else if (body.username == '' || !body.username) {
      res.status(400).json({ error: 'You need to enter username!' })
    } else if (body.email == '' || !body.email) {
      res.status(400).json({ error: 'You need to enter email!' })
    } else if (body.password == '' || !body.password) {
      res.status(400).json({ error: 'You need to enter password!' })
    } else {
      res.status(201).send(await registerUser(body))
    }
  } catch (error) {
    return res.status(500)
  }
}

export const loginUser = async (req: JwtRequest<Credentials>, res: Response) => {
  const credentials = req.body
  const userInfo = await login(credentials)
  if (!userInfo) {
    return res.sendStatus(403)
  }
  const token = createJwtToken(credentials)
  res.status(200).json({ token })
}

export const getUserInfo = async (req: JwtRequest<Credentials>, res: Response): Promise<void> => {
  {
    const userName = req.jwt?.username
    try {
      const currentUser = await UserModel.findOne({
        username: userName,
      }).exec()
      res.status(200).json(currentUser)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
