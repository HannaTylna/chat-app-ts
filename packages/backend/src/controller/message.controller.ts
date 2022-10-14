import { Message } from '@chat-app/shared'
import { Request, Response } from 'express'
import { allMessages } from '../models/messages'
import { registerMessage } from '../services/message.service'

export const addANewMsg = async (req: Request, res: Response) => {
  console.log('req.body', req.body)
  const body = req.body as Message

  try {
    if (body) {
      res.send(await registerMessage(body))
    }
  } catch (error) {
    return res.status(500)
  }
}

export const renderAllMessages = async (req: Request, res: Response) => {
  res.send(await allMessages())
}
