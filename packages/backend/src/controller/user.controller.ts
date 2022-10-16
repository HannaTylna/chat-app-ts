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
  console.log('userInfo', userInfo)
  if (!userInfo) {
    return res.sendStatus(403)
  }
  const token = createJwtToken({ sub: userInfo.username, username: userInfo.username })
  // res.status(200).json({ token })
  res.status(200).send({ token: token, userId: userInfo._id })
}
