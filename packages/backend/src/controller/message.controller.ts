import { Message } from '@chat-app/shared'
import { Request, Response } from 'express'
import { JwtRequest } from '../middleware/auth'
import { allMessages } from '../models/messages'
import { UserModel } from '../models/users'
import { registerMessage } from '../services/message.service'
import jsonwebtoken from 'jsonwebtoken'

export const addANewMsg = async (req: JwtRequest<Message>, res: Response) => {
  console.log('req.body', req.body)
  const body = req.body as Message
  const authorization = req.headers.authorization

  try {
    if (authorization && authorization.startsWith('Bearer ')) {
      const user = jsonwebtoken.decode(authorization.substring(7))
      console.log('user', user)
      const currentUser = await UserModel.findOne({ username: user?.sub }).exec()

      console.log('currentuser', currentUser?.id)
      res.send(await registerMessage(body, currentUser?.id))
    }
  } catch (error) {
    return res.status(500)
  }
}

export const renderAllMessages = async (req: Request, res: Response) => {
  res.send(await allMessages())
}
